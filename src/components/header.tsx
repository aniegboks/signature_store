"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from '@/utils';
import { useCartStore } from '@/store/store';

const menuVariants = {
    open: {
        transition: {
            staggerChildren: 0.05,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
};
const Header = () => {
    const { user } = useUser();
    const [isToggle, setIsToggle] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < lastScrollY) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const itemCount = useCartStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    )

    return (
        <header>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-heading text-sm"
                initial={{ y: 0 }}
                animate={{ y: showNavbar ? 0 : -100 }}
                transition={{ duration: 0.3 }}
            >
                <div className="backdrop-blur-md bg-white/30 px-4 py-6 md:py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-8 md:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                        {/* Left Nav */}
                        <ul className="hidden md:flex items-center gap-4">
                            {nav.map(({ name, label }) => (
                                <li key={name}>
                                    <Link
                                        href={label}
                                        className="text-sm font-medium text-gray-700 hover:text-black transition"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-2xl font-heading font-bold text-orange-500 hover:opacity-80 transition"
                        >
                            Signature
                        </Link>

                        {/* Right Nav */}
                        <ul className="hidden md:flex items-center gap-8">
                            <Link href="/cart">
                                <div className='flex items-center justify-center relative'>
                                    <span className='mr-2 text-sm'>Cart</span>
                                    <ShoppingBag size={12} />
                                    <span className={`h-4 w-4 p-2 bg-red-500 text-white flex items-center justify-center rounded-full absolute top-[-4] left-11 ${itemCount === 0 ? 'hidden' : 'flex'}`}>{itemCount}</span>
                                </div>
                            </Link>
                            <div>
                                <ClerkLoaded>
                                    <div className='flex gap-4'>
                                        <div className='flex items-center justify-center'>
                                            {user && (
                                                <Link href="/orders" className='flex-1 relative flex items-center justify-center'>
                                                    <span className='mr-2 text-sm'>Orders</span>
                                                </Link>
                                            )}
                                        </div>

                                        <div>
                                            {user ? (
                                                <div className='flex items-center'>
                                                    <UserButton />

                                                </div>
                                            ) : (
                                                <SignInButton mode="modal" />
                                            )}
                                        </div>
                                    </div>
                                </ClerkLoaded>
                            </div>
                        </ul>

                        {/* Hamburger */}
                        <div className="md:hidden flex items-center">
                            <button
                                className="cursor-pointer text-neutral-600"
                                onClick={() => setIsToggle(!isToggle)}
                            >
                                {isToggle ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isToggle && (
                        <motion.div
                            className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-6"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <motion.ul className="flex flex-col gap-6">
                                {nav.map(({ name, label }) => (
                                    <motion.li
                                        key={label}
                                        variants={itemVariants}
                                        onClick={() => setIsToggle(false)}
                                    >
                                        <Link
                                            href={label}
                                            className="text-sm font-medium text-gray-700 hover:text-black transition"
                                        >
                                            {name}
                                        </Link>
                                    </motion.li>
                                ))}
                                <motion.li
                                    variants={itemVariants}
                                    onClick={() => setIsToggle(false)}
                                >
                                    <Link href="/basket">
                                        <div className='flex'>
                                            <span>Cart</span>
                                        </div>
                                    </Link>
                                </motion.li>
                                <motion.li
                                    variants={itemVariants}
                                >
                                    <div>
                                        <ClerkLoaded>
                                            <div className=''>
                                                <div className=''>
                                                    {user && (
                                                        <Link href="/orders" className=''>
                                                            <span
                                                                className='mr-2'
                                                                onClick={() => setIsToggle(false)}

                                                            >Orders</span>
                                                        </Link>
                                                    )}
                                                </div>

                                                <div>
                                                    {user ? (
                                                        <div className='mt-4'>
                                                            <UserButton />

                                                        </div>
                                                    ) : (
                                                        <SignInButton mode="modal" />
                                                    )}
                                                </div>
                                            </div>
                                        </ClerkLoaded>
                                    </div>
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    )
}

export default Header;




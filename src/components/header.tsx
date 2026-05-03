'use client';

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/utils";
import { useCartStore, CartState } from "@/store/store";

const Header = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastY = useRef(0);

  const itemCount = useCartStore((state: CartState) =>
    state.items.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0),
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 60);
      setIsScrolled(y > 20);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Elegant easing for all animations
  const elegantEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Dynamic color variables based on scroll state
  const textBase = isScrolled ? "text-neutral-900" : "text-[#FAFAFA]";
  const textMuted = isScrolled ? "text-neutral-500" : "text-white/70";
  const textHover = isScrolled ? "hover:text-neutral-900" : "hover:text-white";

  // Reusable Brand Logo Component
  // `forceDark` ensures it stays dark inside the white mobile menu overlay
  const BrandLogo = ({ forceDark = false }: { forceDark?: boolean }) => {
    const colorClass = forceDark ? "text-neutral-900" : textBase;

    return (
      <div className={`flex items-center gap-4 group cursor-pointer ${colorClass}`}>
        <div className="relative size-6 md:size-8 flex items-center justify-center">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 256 256"
            className="size-full fill-current group-hover:opacity-60 transition-opacity duration-500"
          >
            <path d="M 164 0 C 188.301 0 208 19.7 208 44 C 208 45.417 207.93 46.818 207.799 48.2 C 209.182 48.07 210.583 48 212 48 C 236.301 48 256 67.7 256 92 C 256 106.883 248.609 120.037 237.3 128 C 248.609 135.963 256 149.117 256 164 C 256 188.301 236.301 208 212 208 C 210.583 208 209.182 207.93 207.799 207.799 C 207.93 209.182 208 210.583 208 212 C 208 236.301 188.301 256 164 256 C 149.117 256 135.963 248.609 128 237.3 C 120.037 248.609 106.883 256 92 256 C 67.7 256 48 236.301 48 212 C 48 210.583 48.07 209.182 48.2 207.799 C 46.804 207.932 45.402 207.999 44 208 C 19.7 208 0 188.301 0 164 C 0 149.118 7.39 135.963 18.7 128 C 7.39 120.037 0 106.882 0 92 C 0 67.7 19.7 48 44 48 C 45.417 48 46.818 48.07 48.2 48.2 C 48.07 46.818 48 45.417 48 44 C 48 19.7 67.7 0 92 0 C 106.882 0 120.037 7.39 128 18.7 C 135.963 7.39 149.118 0 164 0 Z M 128 69.3 C 120.037 80.61 106.883 88 92 88 C 90.583 88 89.182 87.93 87.799 87.799 C 87.932 89.195 87.999 90.597 88 92 C 88 106.883 80.61 120.037 69.3 128 C 80.61 135.963 88 149.117 88 164 C 88 165.417 87.93 166.818 87.799 168.2 C 89.182 168.069 90.583 168 92 168 C 106.882 168 120.037 175.39 128 186.699 C 135.963 175.39 149.118 168 164 168 C 165.417 168 166.818 168.069 168.2 168.2 C 168.067 166.804 168 165.402 168 164 C 168 149.118 175.39 135.963 186.699 128 C 175.39 120.037 168 106.882 168 92 C 168 90.583 168.069 89.182 168.2 87.799 C 166.804 87.932 165.402 87.999 164 88 C 149.117 88 135.963 80.61 128 69.3 Z" />
          </motion.svg>
        </div>
        <div className="flex flex-col pt-1">
          <span className="font-heading italic text-xl md:text-2xl tracking-tight leading-none group-hover:opacity-60 transition-opacity duration-500">
            Signature.
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/[0.04] py-4"
          : "bg-transparent py-6"
          }`}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.6, ease: elegantEasing }}
      >
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
          <div className="flex items-center justify-between">

            {/* ── Left: Logo & Desktop Nav ── */}
            <div className="flex items-center gap-12 lg:gap-16">
              <Link href="/">
                <BrandLogo />
              </Link>

              <nav className="hidden lg:flex items-center gap-8">
                {nav.map(({ name, label }) => (
                  <Link
                    key={name}
                    href={label}
                    className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${textMuted} ${textHover}`}
                  >
                    {name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Right: Cart & Auth ── */}
            <div className="flex items-center gap-6 md:gap-8">

              <Link
                href="/cart"
                className={`text-[10px] uppercase tracking-[0.2em] hover:opacity-60 transition-opacity duration-300 flex items-center gap-1.5 ${textBase}`}
              >
                <span>Cart</span>
                <span className={textMuted}>({itemCount})</span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <ClerkLoaded>
                  {user ? (
                    <div className="flex items-center gap-6">
                      <Link
                        href="/orders"
                        className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${textMuted} ${textHover}`}
                      >
                        Orders
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <button className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${textMuted} ${textHover}`}>
                        Sign In
                      </button>
                    </SignInButton>
                  )}
                </ClerkLoaded>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className={`lg:hidden hover:opacity-60 transition-opacity duration-300 ${textBase}`}
                aria-label="Open Menu"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Overlay Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#FAFAFA] flex flex-col"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: elegantEasing }}
          >
            {/* Header inside menu (Forces dark text) */}
            <div className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-black/[0.04]">
              <BrandLogo forceDark={true} />
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Close <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 flex flex-col justify-center px-6 md:px-12 space-y-6">
              {nav.map(({ name, label }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: elegantEasing }}
                >
                  <Link
                    href={label}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-6"
                  >
                    <span className="text-xs text-neutral-300 font-light">0{i + 1}</span>
                    <span className="text-5xl md:text-7xl font-serif text-neutral-900 tracking-tight group-hover:italic transition-all duration-500">
                      {name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="pt-12 mt-12 border-t border-black/[0.04] flex flex-col gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <ClerkLoaded>
                  {user ? (
                    <>
                      <Link href="/orders" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-neutral-900 transition-colors">Orders</Link>
                      <UserButton afterSignOutUrl="/" />
                    </>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="text-left text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-neutral-900 transition-colors w-fit">
                        Sign In / Register
                      </button>
                    </SignInButton>
                  )}
                </ClerkLoaded>
              </motion.div>
            </nav>

            {/* Footer inside menu */}
            <div className="p-6 md:p-12 text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Signature.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
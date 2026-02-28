'use client';

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, X, Menu, Terminal } from "lucide-react";
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

  return (
    <>
      <style>{`
        .dash-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 95%;
        }
        .dash-link {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: currentColor; 
          opacity: 0.5;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dash-link:hover { opacity: 1; text-shadow: 0 0 10px rgba(249, 115, 22, 0.3); }
        
        .hud-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: currentColor;
          opacity: 0.3;
        }
      `}</style>

      <motion.header
        className="fixed top-6 left-0 right-0 z-50 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="dash-container pointer-events-auto">
          <div
            className={`
            relative overflow-hidden transition-all duration-500 border
            ${
              isScrolled
                ? "bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-black/10 dark:border-white/10 text-black dark:text-white"
                : "bg-black/40 backdrop-blur-xl border-white/10 text-white"
            }
            px-6 md:px-8 py-3 flex items-center justify-between shadow-2xl
          `}
          >
            {/* Grid - Only visible in Dark/Initial state */}
            {!isScrolled && (
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px]" />
            )}

            {/* ── Left: Subtle Animated Logo ── */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="relative size-8 flex items-center justify-center">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    viewBox="0 0 256 256"
                    className="size-full text-current transition-colors duration-500"
                  >
                    <path
                      fill="currentColor"
                      d="M 164 0 C 188.301 0 208 19.7 208 44 C 208 45.417 207.93 46.818 207.799 48.2 C 209.182 48.07 210.583 48 212 48 C 236.301 48 256 67.7 256 92 C 256 106.883 248.609 120.037 237.3 128 C 248.609 135.963 256 149.117 256 164 C 256 188.301 236.301 208 212 208 C 210.583 208 209.182 207.93 207.799 207.799 C 207.93 209.182 208 210.583 208 212 C 208 236.301 188.301 256 164 256 C 149.117 256 135.963 248.609 128 237.3 C 120.037 248.609 106.883 256 92 256 C 67.7 256 48 236.301 48 212 C 48 210.583 48.07 209.182 48.2 207.799 C 46.804 207.932 45.402 207.999 44 208 C 19.7 208 0 188.301 0 164 C 0 149.118 7.39 135.963 18.7 128 C 7.39 120.037 0 106.882 0 92 C 0 67.7 19.7 48 44 48 C 45.417 48 46.818 48.07 48.2 48.2 C 48.07 46.818 48 45.417 48 44 C 48 19.7 67.7 0 92 0 C 106.882 0 120.037 7.39 128 18.7 C 135.963 7.39 149.118 0 164 0 Z M 128 69.3 C 120.037 80.61 106.883 88 92 88 C 90.583 88 89.182 87.93 87.799 87.799 C 87.932 89.195 87.999 90.597 88 92 C 88 106.883 80.61 120.037 69.3 128 C 80.61 135.963 88 149.117 88 164 C 88 165.417 87.93 166.818 87.799 168.2 C 89.182 168.069 90.583 168 92 168 C 106.882 168 120.037 175.39 128 186.699 C 135.963 175.39 149.118 168 164 168 C 165.417 168 166.818 168.069 168.2 168.2 C 168.067 166.804 168 165.402 168 164 C 168 149.118 175.39 135.963 186.699 128 C 175.39 120.037 168 106.882 168 92 C 168 90.583 168.069 89.182 168.2 87.799 C 166.804 87.932 165.402 87.999 164 88 C 149.117 88 135.963 80.61 128 69.3 Z"
                    />
                  </motion.svg>
                  <div className="absolute size-1 bg-[#f97316] rounded-full animate-pulse shadow-[0_0_8px_#f97316]" />
                </div>
                
                <div className="flex flex-col">
                  <span className="font-serif italic text-xl tracking-tighter leading-none transition-colors duration-500">
                    Signature
                  </span>
                  <span className="text-[7px] font-mono text-[#f97316] tracking-[0.4em] uppercase font-bold">
                    Protocol_V2
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8 border-l border-current/10 pl-8 transition-colors duration-500">
                {nav.map(({ name, label }, i) => (
                  <Link key={name} href={label} className="dash-link">
                    <span className="opacity-20 text-[7px]">0{i + 1}</span>
                    {name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Right: Tech Metrics ── */}
            <div className="flex items-center gap-4 md:gap-8">
              <Link href="/cart" className="dash-link group">
                <div className="relative">
                  <ShoppingBag size={14} className="group-hover:text-[#f97316] transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-[7px] bg-[#f97316] text-black font-bold px-1 rounded-full min-w-[12px] text-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Module_Cart</span>
              </Link>

              <div className="hidden md:flex items-center gap-6 border-l border-current/10 pl-8 transition-colors duration-500">
                <ClerkLoaded>
                  {user ? (
                    <div className="flex items-center gap-4">
                      <Link href="/orders" className="dash-link">Orders</Link>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="dash-link border border-current/20 px-4 py-1.5 hover:bg-[#f97316] hover:text-black transition-all">
                        Login_Auth
                      </button>
                    </SignInButton>
                  )}
                </ClerkLoaded>
              </div>

              <button 
                onClick={() => setIsOpen(true)} 
                className="lg:hidden p-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Menu size={18} />
              </button>

              <div className="hud-bracket top-0 left-0 border-t border-l" />
              <div className="hud-bracket top-0 right-0 border-t border-r" />
              <div className="hud-bracket bottom-0 left-0 border-b border-l" />
              <div className="hud-bracket bottom-0 right-0 border-b border-r" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Overlay Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white dark:bg-black lg:hidden flex flex-col font-mono"
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
          >
            {/* Background Grid for Menu */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(90deg,#888_1px,transparent_1px),linear-gradient(#888_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="flex items-center justify-between p-8 border-b border-black/5 dark:border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-[#f97316]" />
                <span className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-[0.4em]">System_Interface</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-[9px] text-black dark:text-white uppercase tracking-widest hover:text-[#f97316] transition-colors"
              >
                Terminate <X size={16} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-12 space-y-8 relative z-10">
              {nav.map(({ name, label }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link 
                    href={label} 
                    onClick={() => setIsOpen(false)}
                    className="group flex items-baseline gap-6"
                  >
                    <span className="text-[#f97316] text-xs font-bold font-mono">0{i+1}</span>
                    <span className="text-5xl text-black dark:text-white font-light tracking-tighter uppercase group-hover:italic group-hover:text-[#f97316] transition-all">
                      {name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-8 border-t border-black/5 dark:border-white/10 relative z-10">
              <div className="flex justify-between text-[8px] text-black/40 dark:text-white/30 uppercase tracking-[0.2em] font-bold">
                <span>Access: {user?.firstName || 'Guest'}</span>
                <span className="text-[#f97316]">Link_Stable</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
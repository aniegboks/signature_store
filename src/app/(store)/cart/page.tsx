"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { createCheckoutSession, Metadata } from "@/action/createCheckkoutSession";

// --- CUSTOM ANIMATION EASING ---
const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
};

const CartPage = () => {
  const groupItems = useCartStore((state) => state.getGroupedItems());
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  const totalPrice = getTotalPrice().toFixed(2);

  const handleOrderCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        customerName: user?.fullName || "Guest",
        customerEmail: user?.emailAddresses[0]?.emailAddress || "unknown",
        clerkUserId: user?.id || "unknown",
      };

      const response = await createCheckoutSession(groupItems, metadata);

      if (response.success && response.message) {
        window.location.href = response.message;
      } else {
        toast.error(response.message || "Checkout failed.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during finalization.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- EMPTY STATE (THE VOID) ---
  if (groupItems.length === 0) {
    return (
      <div className="py-48 min-h-screen bg-neutral-50 flex items-center selection:bg-black selection:text-white">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.span
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.4em] text-neutral-400 uppercase mb-8 block"
            >
              00 — Index
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-7xl md:text-9xl font-serif italic tracking-tighter mb-8 text-[#111111]"
            >
              The Archive.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-16 leading-loose"
            >
              Your curation space is empty. Return to the gallery to acquire new textural studies.
            </motion.p>
            <motion.button
              variants={fadeUp}
              onClick={() => router.push("/")}
              className="relative group overflow-hidden flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#111111] pb-2"
            >
              <span className="relative z-10">Return to Gallery</span>
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                <ArrowRight size={14} strokeWidth={1.5} />
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/20 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] delay-75" />
            </motion.button>
          </motion.div>
        </Container>
      </div>
    );
  }

  // --- CURATED STATE ---
  return (
    <div className="py-32 lg:py-48 min-h-screen bg-[#F4F3F0] text-[#111111] selection:bg-black selection:text-white">
      <Container>
        {/* EDITORIAL HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: premiumEase }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 lg:mb-32 gap-10"
        >
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-serif italic leading-none tracking-tighter">
              Your <span className="text-neutral-300 not-italic">Selection</span>
            </h1>
          </div>
          <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-[0.25em] flex items-center gap-4">
            <span className="w-12 h-[1px] bg-neutral-300 block"></span>
            [{groupItems.length}] {groupItems.length === 1 ? 'Item' : 'Items'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

          {/* --- ITEMS LIST (Awwwards Style) --- */}
          <div className="lg:col-span-7">
            <div className="border-t border-black/10">
              <AnimatePresence mode="popLayout">
                {groupItems.map((item, index) => (
                  <motion.div
                    key={item.product._id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                    transition={{ duration: 0.8, ease: premiumEase, delay: index * 0.1 }}
                    className="group relative flex flex-col sm:flex-row gap-8 lg:gap-12 py-12 border-b border-black/10"
                  >
                    {/* IMAGE VIEWPORT */}
                    <div
                      className="relative w-full sm:w-[180px] shrink-0 aspect-[4/5] bg-neutral-200 overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                    >
                      {item.product.images && (
                        <Image
                          src={imageUrl(item.product.images[0]).url()}
                          alt={item.product.name || "Product"}
                          fill
                          className="object-cover scale-[1.02] group-hover:scale-[1.08] transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] opacity-90 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                    </div>

                    {/* CONTENT FOCUS */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="text-2xl lg:text-3xl font-serif italic tracking-tight leading-none group-hover:text-black/70 transition-colors duration-500">
                            {item.product.name}
                          </h3>
                          <p className="text-sm font-mono tracking-tight whitespace-nowrap">
                            ${(item.product.price! * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.25em]">
                          {item.product.tag || "Core Collection"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-12 sm:mt-auto">
                        {/* BRUTALIST QUANTITY CONTROLS */}
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-neutral-400 hover:text-black transition-colors duration-300 p-2 -ml-2"
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="text-[11px] font-mono tracking-widest">{item.quantity.toString().padStart(2, '0')}</span>
                          <button
                            onClick={() => addItem(item.product)}
                            className="text-neutral-400 hover:text-black transition-colors duration-300 p-2 -mr-2"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            removeItem(item.product._id);
                            toast("Removed from archive", { icon: "✕", style: { borderRadius: 0, background: '#111', color: '#fff', fontSize: '12px' } });
                          }}
                          className="relative text-[10px] font-medium text-neutral-400 uppercase tracking-[0.2em] overflow-hidden group/btn"
                        >
                          <span className="block group-hover/btn:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]">Remove</span>
                          <span className="absolute top-0 left-0 w-full translate-y-full group-hover/btn:translate-y-0 text-red-500 transition-transform duration-500 ease-[0.16,1,0.3,1]">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* --- ORIGINAL SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-40 bg-white p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-black/5">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] mb-10 text-neutral-400">
                Finalize Purchase
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-xs font-medium uppercase tracking-widest text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-black">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-xs font-medium uppercase tracking-widest text-neutral-400">
                  <span>Shipping</span>
                  <span className="italic">Calculated at next step</span>
                </div>

                <div className="h-px bg-black/5 my-8" />

                <div className="flex justify-between items-baseline">
                  <span className="font-serif italic text-3xl">Total</span>
                  <span className="text-4xl font-light tracking-tighter">${totalPrice}</span>
                </div>
              </div>

              {isSignedIn ? (
                <button
                  className="w-full py-6 flex items-center justify-center gap-4 bg-[#1A1A1A] text-white hover:bg-neutral-800 transition-all duration-500 disabled:opacity-50 group"
                  onClick={handleOrderCheckout}
                  disabled={isLoading}
                >
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">
                    {isLoading ? "Processing..." : "Finalize Selection"}
                  </span>
                  {!isLoading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="w-full py-6 bg-[#1A1A1A] text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all">
                    Sign in to Continue
                  </button>
                </SignInButton>
              )}

              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="h-px w-12 bg-neutral-100" />
                <p className="text-[9px] text-neutral-300 uppercase text-center tracking-[0.2em] leading-relaxed">
                  Every piece is hand-inspected <br /> and wrapped for its journey.
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>
      <Toaster />
    </div>
  );
};

export default CartPage;
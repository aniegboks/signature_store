"use client";

import { Product } from "../../../sanity.types";
import { useCartStore } from "@/store/store";
import { useState, useEffect } from "react";
import Button from "./button";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type AddToCartButtonProps = {
  product: Product;
  disabled: boolean;
};

const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
  const { addItem } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleAdd = () => {
    setIsProcessing(true);

    // The luxury delay: giving the interaction weight
    setTimeout(() => {
      addItem(product);
      setIsProcessing(false);

      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border border-black/5 p-5 flex items-center gap-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] min-w-[320px]"
        >
          <div className="size-14 bg-[#F5F4F0] relative flex-shrink-0 flex items-center justify-center">
            <div className="flex flex-col gap-1.5 opacity-20">
              <div className="h-[1px] w-5 bg-black" />
              <div className="h-[1px] w-8 bg-black" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] mb-1">Look Added</span>
            <span className="text-base font-serif italic text-[#1A1A1A] leading-tight">{product.name}</span>
          </div>
        </motion.div>
      ), { duration: 3000, position: 'bottom-right' });
    }, 900);
  };

  return (
    <div className="mt-16 flex flex-col gap-10">

      {/* --- EDITORIAL HEADER --- */}
      <div className="flex items-end justify-between border-b border-black/5 pb-6">
        <div className="space-y-1.5">
          <span className="block text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em]">
            Material Identity
          </span>
          <p className="text-xs  font-header text-neutral-500">
            Weighted for comfort, tailored for the gaze.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-medium text-neutral-300 uppercase tracking-[0.2em]">
            Collection
          </span>
          <span className="text-[10px] font-medium text-black">
            {product.tag || "Core Piece"}
          </span>
        </div>
      </div>

      <Button
        onClick={handleAdd}
        disabled={disabled || isProcessing}
        variant="primary"
        size="full"
        className="group relative h-20 bg-[#1A1A1A] text-white overflow-hidden transition-all duration-700 ease-[0.19,1,0.22,1]"
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.4em]">
                Acquiring Form...
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-6"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.4em]">
                {disabled ? "Sold Out" : "Add to cart"}
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500 ease-out" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- LUXURY HOVER DETAIL: The internal border reveal --- */}
        <div className="absolute inset-2 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none" />

        {/* Subtle Progress Wipe */}
        <motion.div
          className="absolute inset-0 bg-white/5 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={isProcessing ? { x: "0%" } : { x: "-100%" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        />
      </Button>

      {/* --- REFINED STATUS FOOTER --- */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-black/5" />
          <span className="text-[8px] font-medium text-neutral-300 uppercase tracking-[0.4em]">Hand-Wrapped</span>
          <div className="h-px flex-1 bg-black/5" />
        </div>
        <p className="text-[8px] font-medium text-neutral-400 uppercase tracking-[0.3em] text-center leading-relaxed">
          Secure Studio Transaction // Global Distribution
        </p>
      </div>

      <Toaster />
    </div>
  );
};

export default AddToCartButton;
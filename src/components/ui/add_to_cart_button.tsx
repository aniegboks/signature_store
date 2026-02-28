"use client";

import { Product } from "../../../sanity.types";
import { useCartStore } from "@/store/store";
import { useState, useEffect } from "react";
import Button from "./button";
import toast, { Toaster } from 'react-hot-toast';
import { Power, Terminal } from 'lucide-react';

type AddToCartButtonProps = {
  product: Product;
  disabled: boolean;
};

const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
  const { addItem } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [isEngaging, setIsEngaging] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const addItems = () => {
    setIsEngaging(true);
    
    // Artificial delay to mimic "System Processing"
    setTimeout(() => {
      addItem(product);
      setIsEngaging(false);
      
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-in fade-in slide-in-from-top-4' : 'animate-out fade-out slide-out-to-top-2'} bg-black border border-[#f97316] p-4 flex items-center gap-4`}>
          <Terminal size={14} className="text-[#f97316]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Entry_Logged</span>
            <span className="text-xs font-mono text-white uppercase">{product.name}_LINKED</span>
          </div>
        </div>
      ), { duration: 3000 });
    }, 600);
  };

  return (
    <div className="mt-12 flex flex-col gap-4">
      {/* STATUS HUD ABOVE BUTTON */}
      <div className="flex justify-between items-end px-1">
        <div className="flex flex-col gap-1">
           <span className="text-[8px] font-mono text-black/20 uppercase tracking-[0.3em]">Module_Target</span>
           <span className="text-[10px] font-mono text-black uppercase">{product.slug?.current || "unidentified_asset"}</span>
        </div>
        <div className="text-right">
           <span className="text-[8px] font-mono text-black/20 uppercase tracking-widest">Auth_Status</span>
           <span className="block text-[10px] font-mono text-[#f97316] uppercase">Verified</span>
        </div>
      </div>

      <Button
        onClick={addItems}
        disabled={disabled || isEngaging}
        variant="primary"
        size="full"
        className="group relative"
      >
        <span className="flex items-center gap-3">
          {isEngaging ? (
            <>
              <div className="size-2 bg-[#f97316] rounded-full animate-ping" />
              <span>LOGGING_DATA...</span>
            </>
          ) : (
            <>
              <Power size={14} className={disabled ? "text-white/20" : "text-[#f97316] group-hover:text-black"} />
              <span>{disabled ? "ARCHIVE_ONLY" : "INITIATE_TRANSFER"}</span>
            </>
          )}
        </span>

        {/* DATA BIT DECORATION */}
        <span className="absolute bottom-1 right-2 text-[7px] font-mono opacity-30 group-hover:text-black">
          CMD_044_EXE
        </span>
      </Button>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default AddToCartButton;
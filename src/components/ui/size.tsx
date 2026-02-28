"use client";
import React, { useState } from 'react';
import { PRODUCT_BY_QUERY_IDResult } from '../../../sanity.types';

type SizeProps = {
  product: PRODUCT_BY_QUERY_IDResult;
};

const Size = ({ product }: SizeProps) => {
  const [selectedSize, setSelectedSize] = useState<number>(0);

  return (
    <div className="space-y-4">
      {/* HUD Header for Section */}
      <div className="flex items-center gap-2 mb-2">
         <span className="text-[8px] font-mono text-black/30 uppercase tracking-[0.3em]">Scale_Adjustment //</span>
         <span className="text-[8px] font-mono text-[#f97316] uppercase">Active_Selection</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {product?.sizes?.map((size: string, i: number) => {
          const isActive = selectedSize === i;
          
          return (
            <button
              key={i}
              onClick={() => setSelectedSize(i)}
              className="relative group transition-all duration-300"
            >
              {/* THE TAG: Peach on Black when active, Transparent when not */}
              <div className={`
                px-4 py-2 text-[11px] font-mono tracking-widest transition-all duration-500
                ${isActive 
                  ? 'bg-black text-[#f97316] shadow-lg translate-y-[-2px]' 
                  : 'bg-transparent text-black/40 hover:text-black hover:bg-black/5'}
              `}>
                {size.toUpperCase()}
              </div>

              {/* SELECTION BIT (The tiny orange dot) */}
              {isActive && (
                <div className="absolute -top-1 -right-1 size-1.5 bg-[#f97316] rounded-full animate-pulse" />
              )}

              {/* CORNER WHISPERS (Only on hover/active to keep it strokeless) */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="absolute top-0 left-0 size-1 border-t border-l border-black/20" />
                <div className="absolute bottom-0 right-0 size-1 border-b border-r border-black/20" />
              </div>
            </button>
          );
        })}
      </div>

      {/* FOOTER METADATA */}
      <div className="pt-2">
        <p className="text-[8px] font-mono text-black/20 uppercase tracking-widest">
          Unit_Metric: ISO_Standard_044
        </p>
      </div>
    </div>
  );
};

export default Size;
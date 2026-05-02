"use client";
import React, { useState } from 'react';
import { PRODUCT_BY_QUERY_IDResult } from '../../../sanity.types';

type SizeProps = {
  product: PRODUCT_BY_QUERY_IDResult;
};

const Size = ({ product }: SizeProps) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Editorial Label */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-[0.2em]">
          Dimensions
        </span>
        <div className="w-4 h-px bg-neutral-200" />
      </div>

      <div className="flex flex-wrap gap-4">
        {product?.sizes?.map((size: string, i: number) => {
          const isActive = selectedSize === i;

          return (
            <button
              key={i}
              onClick={() => setSelectedSize(i)}
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {/* Sizing Node */}
              <div className={`
                min-w-[54px] h-[48px] flex items-center justify-center px-4
                text-[11px] tracking-[0.2em] transition-all duration-700
                border border-black/[0.06]
                ${isActive
                  ? 'bg-neutral-900 text-white border-neutral-900 font-serif italic text-sm'
                  : 'bg-transparent text-neutral-400 hover:text-neutral-900 hover:border-neutral-900'}
              `}>
                {size.toUpperCase()}
              </div>

              {/* Minimal Selection Bar beneath the button */}
              <div className={`absolute -bottom-2 left-0 h-[1px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'w-full bg-neutral-900' : 'w-0 bg-transparent'
                }`} />
            </button>
          );
        })}
      </div>

      {/* Narrative Footer */}
      <div className="pt-2">
        <button className="text-[10px] font-sans text-neutral-300 hover:text-neutral-900 transition-colors uppercase tracking-[0.2em] border-b border-transparent hover:border-neutral-900 pb-0.5">
          Size Guide & Fit Details
        </button>
      </div>
    </div>
  );
};

export default Size;
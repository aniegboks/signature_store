'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';

const PopularProducts = ({ popularProduct }: { popularProduct: Product }) => {
  const isOutOfStock = (popularProduct.stock || 0) <= 0;

  return (
    <div className="group relative w-full">
      <Link
        href={`/product/${popularProduct.slug?.current}`}
        className="block"
      >
        {/* Aspect Ratio 4:5 - Product Floats on the Section Background */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {popularProduct.images?.[0] && (
            <Image
              src={imageUrl(popularProduct.images[0]).url()}
              alt={popularProduct.name || ''}
              fill
              className={`object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 ${
                isOutOfStock ? 'opacity-10 grayscale' : 'opacity-100'
              }`}
            />
          )}

          {/* Technical Framing (Transparent) */}
          <div className="absolute inset-0 border border-black/[0.03] group-hover:border-orange-500/20 transition-colors duration-700" />
          
          {/* Subtle Scan Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.05] group-hover:bg-orange-500/30 group-hover:top-full transition-all duration-[2s] linear" />

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.8em] text-black/20 font-mono">
                OUT_OF_SPEC
              </span>
            </div>
          )}
        </div>

        {/* Floating Details (No card background) */}
        <div className="mt-10 px-2">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
               <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="size-[2px] bg-orange-500/40" />
                  ))}
               </div>
               <h2 className="text-lg font-light tracking-tight text-black uppercase">
                 {popularProduct.name}
               </h2>
               <p className="text-[9px] text-black/30 font-mono tracking-widest uppercase">
                 Textile_Ref: {popularProduct._id.slice(0, 8)}
               </p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xl font-serif italic text-black/80">
                   ${popularProduct.price?.toLocaleString()}
                </span>
                <span className="text-[8px] text-orange-500/60 font-mono">0.00_LBS</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularProducts;
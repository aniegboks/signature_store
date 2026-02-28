"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';

const ProductThumbnail = ({ product, index }: { product: Product; index: number }) => {
  const isOutOfStock = (product.stock || 0) <= 0;
  // Pad index for the serial number (e.g., 01, 02)
  const serial = String(index + 1).padStart(2, '0');

  return (
    <div className="group relative w-full mb-12">
      <Link href={`/product/${product.slug?.current}`} className="block">
        
        {/* Serial Number & PEACH ON BLACK TAG (Top Right) */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-[9px] font-mono tracking-widest text-black/30">
            № {serial} / 2026
          </span>
          {/* THE FIX: Peach background, Black text tag */}
          <div className="bg-[#f97316] text-black px-2 py-0.5 min-w-[50px] text-center shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-tighter">
              ${product.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Image Container */}
        {/* bg-white for a cleaner integration with your grid */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-black/[0.03]">
          {product.images?.[0] && (
            <Image
              src={imageUrl(product.images[0]).url()}
              alt={product.name || ''}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110 ${
                isOutOfStock ? 'opacity-20 grayscale' : 'opacity-100'
              }`}
            />
          )}

          {/* Out of Stock Status */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-black border border-black bg-white px-3 py-1.5">
                Archived
              </span>
            </div>
          )}
          
          {/* Subtle Hover Overlay for Interaction */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info Block */}
        <div className="mt-8 relative border-t border-black/[0.03] pt-6 space-y-4">
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-serif italic tracking-tight text-black group-hover:italic transition-all duration-300">
              {product.name}
            </h2>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-black/40">
              {(product as any).category || "Essential Archive"}
            </p>
          </div>
          
          {/* Technical Note (Appears on hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 h-0 group-hover:h-auto overflow-hidden">
            <p className="text-[11px] text-black/60 font-serif italic leading-relaxed max-w-[220px]">
              High-stress engineered component. Verified and sealed for shipment.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductThumbnail;
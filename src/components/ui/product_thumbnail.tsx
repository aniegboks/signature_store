'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';

const ProductThumbnail = ({ product, index }: { product: Product; index: number }) => {
  const isOutOfStock = (product.stock || 0) <= 0;

  return (
    <div className="group relative w-full mb-8">
      <Link href={`/product/${product.slug?.current}`} className="block">

        {/* ── Image Container ── */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 mb-6 shadow-sm">
          {product.images?.[0] && (
            <Image
              src={imageUrl(product.images[0]).url()}
              alt={product.name || 'Garment view'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={`object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${isOutOfStock ? 'opacity-50 grayscale' : 'opacity-100'
                }`}
            />
          )}

          {/* Elegant Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px] transition-all duration-500">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-neutral-900 bg-white/90 px-6 py-3 shadow-sm">
                Archived
              </span>
            </div>
          )}

          {/* Subtle Hover Overlay */}
          <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* ── Editorial Info Block ── */}
        <div className="flex flex-col space-y-2 px-1">
          <div className="flex justify-between items-baseline gap-4">
            <h2 className="text-lg md:text-xl font-serif tracking-tight text-neutral-900 group-hover:italic transition-all duration-500">
              {product.name}
            </h2>
            <span className="text-xs font-sans text-neutral-500 tracking-widest whitespace-nowrap">
              ${product.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-[0.2em] text-neutral-400">
            <span>{product.categories?.[0] ? "Core Collection" : "Essential Archive"}</span>
          </div>

          {/* Poetic Note (Reveals smoothly on hover) */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="overflow-hidden">
              <p className="text-xs text-neutral-500 font-light leading-relaxed pt-4 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-[90%]">
                Crafted with intention. Designed for a draped, structural fit that endures shifting seasons and fleeting trends.
              </p>
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default ProductThumbnail;
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';

const PopularProducts = ({ popularProduct }: { popularProduct: Product }) => {
  const isOutOfStock = (popularProduct.stock || 0) <= 0;

  return (
    <div className="group relative w-full cursor-pointer">
      <Link
        href={`/product/${popularProduct.slug?.current}`}
        className="block w-full h-full"
      >
        {/* Main Image Container - Clean, High-End Luxury Vibe */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#fafafa]">

          {popularProduct.images?.[0] && (
            <Image
              src={imageUrl(popularProduct.images[0]).url()}
              alt={popularProduct.name || ''}
              fill
              className={`object-cover origin-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 ${isOutOfStock ? 'opacity-50' : 'opacity-100'
                }`}
            />
          )}

          {/* Minimalist Hover Overlay - Very subtle darkening */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-[1s] ease-out group-hover:bg-black/[0.03]" />

          {/* Out of Stock - Elegant & Understated */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/60 bg-white/80 backdrop-blur-sm px-5 py-2">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Typography Section - Small, Clean, Highly Legible */}
        <div className="mt-4 flex justify-between items-start px-1">

          {/* Title with an elegant vertical sliding hover reveal */}
          <div className="flex flex-col overflow-hidden h-5">
            <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
              <h2 className="text-xs md:text-sm font-light tracking-wide text-black truncate pr-4">
                {popularProduct.name}
              </h2>
              <span className="absolute top-full left-0 text-xs md:text-sm font-light tracking-wide text-black/40">
                Explore
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs md:text-sm font-light text-black/80 tracking-wider">
              ${popularProduct.price?.toLocaleString()}
            </span>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default PopularProducts;
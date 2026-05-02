"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { useGallery } from '../gallery_context';
import { PRODUCT_BY_QUERY_IDResult } from '../../../sanity.types';
import gsap from 'gsap';

interface ThumbnailProps {
  product: PRODUCT_BY_QUERY_IDResult;
}

const Thumbnail = ({ product }: ThumbnailProps) => {
  const { mainImageIndex, setMainImageIndex } = useGallery();
  const images = product?.images || [];
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".thumb-node", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-6 mt-8 border-t border-black/[0.04]">

      {/* ── GALLERY HEADER ── */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-sans">
            Perspectives
          </span>
          <div className="w-4 h-px bg-neutral-200" />
        </div>
        <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-sans">
          {String(images.length).padStart(2, '0')} Views
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
        {images.map((img, i) => (
          <button
            key={img._key || i}
            onClick={() => setMainImageIndex(i)}
            className={`thumb-node relative w-20 shrink-0 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === mainImageIndex ? 'opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
          >
            {/* ── IMAGE CONTAINER ── */}
            <div className={`relative aspect-square bg-neutral-100 transition-all duration-700 ${i === mainImageIndex ? 'p-1 bg-neutral-200' : 'p-0'
              }`}>
              <Image
                src={imageUrl(img).url()}
                alt={`Product view 0${i + 1}`}
                fill
                className="object-cover"
              />
            </div>

            {/* ── EDITORIAL INDEX ── */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <span className={`text-[9px] font-sans tracking-widest transition-colors duration-500 ${i === mainImageIndex ? 'text-neutral-900' : 'text-neutral-300'
                }`}>
                0{i + 1}
              </span>

              {/* Minimalist Selection Bar */}
              <div className={`h-[1px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === mainImageIndex ? 'w-full bg-neutral-900' : 'w-0 bg-transparent'
                }`} />
            </div>
          </button>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Thumbnail;
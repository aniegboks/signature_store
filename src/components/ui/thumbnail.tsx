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
        y: 10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "expo.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-8 mt-4 border-t border-black/[0.03]">
      {/* HEADER HUD */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
            <div className="size-1 bg-[#f97316] animate-pulse rounded-full" />
            <span className="text-[8px] font-mono text-black uppercase tracking-[0.4em]">Multi_Angle_Scan</span>
        </div>
        <span className="text-[8px] font-mono text-black/20 uppercase tracking-widest">Buffer // {images.length} Nodes</span>
      </div>

      <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
        {images.map((img, i) => (
          <button
            key={img._key || i}
            onClick={() => setMainImageIndex(i)}
            className={`thumb-node relative w-24 shrink-0 transition-all duration-500 ${
              i === mainImageIndex ? 'scale-110' : 'scale-100 opacity-30 hover:opacity-100'
            }`}
          >
            {/* NO STROKE IMAGE CONTAINER */}
            <div className="relative aspect-square bg-transparent transition-colors">
              
              {/* Subtle Corner Markers (No full stroke) */}
              <div className="absolute top-0 left-0 size-1 border-t border-l border-black/10" />
              <div className="absolute bottom-0 right-0 size-1 border-b border-r border-black/10" />

              <Image
                src={imageUrl(img).url()}
                alt={`Angle_0${i}`}
                fill
                className="object-contain"
              />

              {/* SCANNING LINE EFFECT */}
              {i === mainImageIndex && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                   <div className="w-full h-[1px] bg-[#f97316]/40 absolute top-0 animate-[scan_2.5s_linear_infinite]" />
                </div>
              )}
            </div>

            {/* PEACH ON BLACK INDEX TAG */}
            <div className="absolute -top-1 -right-1 z-10">
               <div className={`${i === mainImageIndex ? 'bg-[#f97316] text-black font-bold' : 'bg-black text-white/20'} px-1.5 py-0.5 text-[7px] font-mono leading-none transition-colors duration-500`}>
                  0{i + 1}
               </div>
            </div>

            {/* MINIMAL SELECTION INDICATOR */}
            <div className="mt-3 flex justify-center">
                <div className={`h-[3px] rounded-full transition-all duration-700 ${i === mainImageIndex ? 'w-4 bg-[#f97316]' : 'w-0 bg-transparent'}`} />
            </div>
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Thumbnail;
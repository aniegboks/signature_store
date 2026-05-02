'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { useGallery } from '../gallery_context';
import { AnimatePresence, motion } from 'framer-motion';
import { PRODUCT_BY_QUERY_IDResult } from '../../../sanity.types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  product: PRODUCT_BY_QUERY_IDResult;
  isOutOfStock: boolean;
}

// --- REFINED EDITORIAL VARIANTS ---
const elegantEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: elegantEasing }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: elegantEasing }
  }
};

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: elegantEasing }
  }
};

const uiFadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const }
  }
};

const Gallery = ({ product, isOutOfStock }: GalleryProps) => {
  const { mainImageIndex, setMainImageIndex } = useGallery();
  const [isImmersive, setIsImmersive] = useState(false);
  const images = product?.images || [];
  const image = images[mainImageIndex];
  const galleryRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    const nextIdx = (mainImageIndex + 1) % images.length;
    setMainImageIndex(nextIdx);
  }, [mainImageIndex, images.length, setMainImageIndex]);

  const prevImage = useCallback(() => {
    const prevIdx = (mainImageIndex - 1 + images.length) % images.length;
    setMainImageIndex(prevIdx);
  }, [mainImageIndex, images.length, setMainImageIndex]);

  const toggleImmersive = useCallback(() => {
    if (isOutOfStock) return;
    setIsImmersive(!isImmersive);
  }, [isImmersive, isOutOfStock]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isImmersive) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setIsImmersive(false);
    };

    if (isImmersive) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isImmersive, mainImageIndex, nextImage, prevImage]);

  return (
    <div className="w-full h-full font-sans">
      {/* --- PRIMARY VIEWPORT --- */}
      <div
        ref={galleryRef}
        className="relative aspect-[4/5] w-full bg-neutral-50 overflow-hidden group border border-black/[0.03]"
      >
        <AnimatePresence mode="wait">
          {image && (
            <motion.div
              key={mainImageIndex}
              className="absolute inset-0 p-8 md:p-12"
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Image
                src={imageUrl(image).url()}
                alt={product?.name || 'Garment Perspective'}
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- INTERFACE OVERLAYS --- */}
        <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-sans">Perspective</span>
            <span className="text-xs text-neutral-900 font-serif italic tracking-tight">
              0{mainImageIndex + 1} &mdash; 0{images.length}
            </span>
          </div>

          <button
            onClick={toggleImmersive}
            className="pointer-events-auto size-12 bg-white/80 backdrop-blur-md border border-black/[0.04] flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all duration-500 shadow-sm"
          >
            <Maximize2 size={16} strokeWidth={1.5} />
          </button>
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 z-30 bg-white/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white px-10 py-4 border border-black/[0.04] shadow-xl">
              <span className="text-[10px] text-neutral-900 font-sans tracking-[0.4em] uppercase">Archived Selection</span>
            </div>
          </div>
        )}
      </div>

      {/* --- IMMERSIVE EXHIBITION OVERLAY --- */}
      <AnimatePresence>
        {isImmersive && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Minimal Header */}
            <motion.div variants={uiFadeVariants} className="h-24 flex items-center justify-between px-8 md:px-12 bg-white">
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-sans">
                  Detailed Examination
                </span>
                <div className="w-8 h-px bg-neutral-200 hidden md:block" />
                <h2 className="text-sm font-serif italic text-neutral-900 hidden md:block">
                  {product?.name}
                </h2>
              </div>
              <button
                onClick={toggleImmersive}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                Close <X size={18} strokeWidth={1.2} />
              </button>
            </motion.div>

            {/* Exhibition Space */}
            <div className="flex-1 relative flex items-center justify-center bg-[#FAFAFA] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainImageIndex}
                  variants={imageRevealVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  className="relative w-full h-full max-w-5xl p-12 md:p-24"
                >
                  <Image
                    src={imageUrl(image!).url()}
                    alt="Collection Perspective"
                    fill
                    className="object-contain mix-blend-multiply drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Context Labels */}
              <div className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-8 z-20">
                <motion.div variants={uiFadeVariants} className="space-y-1">
                  <span className="block text-[9px] text-neutral-400 uppercase tracking-[0.2em]">Material</span>
                  <p className="text-xs text-neutral-900 font-sans tracking-wide">Premium Weighted Fabric</p>
                </motion.div>
                <motion.div variants={uiFadeVariants} className="space-y-1">
                  <span className="block text-[9px] text-neutral-400 uppercase tracking-[0.2em]">Silhouette</span>
                  <p className="text-xs text-neutral-900 font-sans tracking-wide">Structural Drape</p>
                </motion.div>
              </div>
            </div>

            {/* Refined Navigation */}
            <motion.div variants={uiFadeVariants} className="h-32 border-t border-black/[0.04] flex items-center justify-between px-8 md:px-24 bg-white">
              <button onClick={prevImage} className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 transition-all duration-500">
                <ChevronLeft size={20} strokeWidth={1} className="group-hover:-translate-x-2 transition-transform" />
                <span>Previous</span>
              </button>

              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-3">
                  {images.map((_, idx) => (
                    <div key={idx} className={`h-[1px] transition-all duration-700 ease-[0.16, 1, 0.3, 1] ${idx === mainImageIndex ? 'w-10 bg-neutral-900' : 'w-4 bg-neutral-200'}`} />
                  ))}
                </div>
              </div>

              <button onClick={nextImage} className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 transition-all duration-500">
                <span>Next</span>
                <ChevronRight size={20} strokeWidth={1} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
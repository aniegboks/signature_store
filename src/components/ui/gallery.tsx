'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { useGallery } from '../gallery_context';
import { AnimatePresence, motion } from 'framer-motion';
import { PRODUCT_BY_QUERY_IDResult } from '../../../sanity.types';
import { Maximize2, X, ChevronLeft, ChevronRight, ScanLine } from 'lucide-react';

interface GalleryProps {
  product: PRODUCT_BY_QUERY_IDResult;
  isOutOfStock: boolean;
}

// --- FRAMER MOTION VARIANTS ---
const shutterVariants = {
  hidden: { clipPath: 'inset(50% 0 50% 0)', opacity: 0 },
  visible: { 
    clipPath: 'inset(0% 0 0% 0)', 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, staggerChildren: 0.1, delayChildren: 0.3 } 
  },
  exit: { 
    clipPath: 'inset(50% 0 50% 0)', 
    opacity: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } 
  }
};

const uiVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: "easeOut" as const } 
  }
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
};

const Gallery = ({ product, isOutOfStock }: GalleryProps) => {
  const { mainImageIndex, setMainImageIndex } = useGallery();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const images = product?.images || [];
  const image = images[mainImageIndex];
  const galleryRef = useRef<HTMLDivElement>(null);

  // --- NAVIGATION LOGIC (Fixes the TS Error) ---
  const nextImage = useCallback(() => {
    const nextIdx = (mainImageIndex + 1) % images.length;
    setMainImageIndex(nextIdx);
  }, [mainImageIndex, images.length, setMainImageIndex]);

  const prevImage = useCallback(() => {
    const prevIdx = (mainImageIndex - 1 + images.length) % images.length;
    setMainImageIndex(prevIdx);
  }, [mainImageIndex, images.length, setMainImageIndex]);

  const toggleDiagnosticMode = useCallback(() => {
    if (isOutOfStock) return;
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen, isOutOfStock]);

  // --- KEYBOARD & SCROLL LOCK ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setIsFullscreen(false);
    };

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, mainImageIndex, nextImage, prevImage]);

  return (
    <div className="w-full h-full font-mono">
      {/* --- MAIN DISPLAY --- */}
      <div 
        ref={galleryRef}
        className="relative aspect-square w-full bg-[#F5F5F5] overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {image && (
            <motion.div
              key={mainImageIndex}
              className="absolute inset-0 p-12"
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <Image
                src={imageUrl(image).url()}
                alt={product?.name || 'Component Image'}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- HUD --- */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-10">
          <div className="flex flex-col gap-1">
             <span className="text-[9px] text-black/30 tracking-[0.3em] uppercase">Status // Verified</span>
             <div className="flex items-center gap-2">
                <div className="size-1 bg-[#f97316] rounded-full animate-pulse" />
                <span className="text-[10px] text-black font-bold tracking-widest uppercase">Node_0{mainImageIndex + 1}</span>
             </div>
          </div>

          <button 
            onClick={toggleDiagnosticMode}
            className="pointer-events-auto size-14 bg-black flex items-center justify-center hover:bg-[#f97316] transition-colors group/btn shadow-xl"
          >
            <Maximize2 size={16} className="text-white group-hover/btn:text-black transition-colors" />
          </button>
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 z-30 bg-[#F5F5F5]/80 backdrop-blur-md flex items-center justify-center border border-red-500/20">
             <div className="bg-black text-red-500 px-8 py-3 text-[11px] font-bold tracking-[0.6em] uppercase flex items-center gap-3">
                <div className="size-2 bg-red-500 rounded-full animate-ping" />
                System_Lock
             </div>
          </div>
        )}
      </div>

      {/* --- FULLSCREEN DIAGNOSTIC OVERLAY --- */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            variants={shutterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Top Bar */}
            <motion.div variants={uiVariants} className="h-20 border-b border-black/5 flex items-center justify-between px-8 bg-white z-20">
               <div className="flex items-center gap-6">
                  <div className="bg-[#f97316] text-black px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg">
                    <ScanLine size={12} />
                    High_Fidelity_Scan
                  </div>
                  <span className="text-xs text-black/30 uppercase tracking-[0.2em] hidden md:block">
                    Target // {product?.name || "Unidentified"}
                  </span>
               </div>
               <button 
                onClick={toggleDiagnosticMode}
                className="size-14 bg-black flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-black transition-all"
               >
                 <X size={20} />
               </button>
            </motion.div>

            {/* Main View */}
            <div className="flex-1 relative flex items-center justify-center bg-[#F9F9F9] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`, backgroundSize: '48px 48px' }} />
                
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={mainImageIndex}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
                        className="relative w-full h-full max-w-6xl p-12 md:p-24"
                    >
                        <Image
                            src={imageUrl(image!).url()}
                            alt="High Res Inspection"
                            fill
                            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Left Telemetry */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-16 z-20">
                   {[1, 2, 3].map((i) => (
                     <motion.div key={i} variants={uiVariants} className="space-y-2">
                        <div className="h-[2px] w-12 bg-[#f97316]" />
                        <span className="block text-[9px] text-black/40 uppercase tracking-widest">Telemetry_0{i}</span>
                        <p className="text-sm text-black font-bold font-mono">VAL_{(i * 44 + mainImageIndex * 12).toString().padStart(4, '0')}</p>
                     </motion.div>
                   ))}
                </div>
            </div>

            {/* Bottom Nav */}
            <motion.div variants={uiVariants} className="h-28 border-t border-black/5 flex items-center justify-center gap-8 md:gap-24 bg-white z-20">
                <button onClick={prevImage} className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 hover:text-[#f97316] transition-colors flex items-center gap-2 group/nav">
                   <ChevronLeft size={16} className="group-hover/nav:-translate-x-1 transition-transform" /> Prev_Node
                </button>
                
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                        {images.map((_, idx) => (
                            <div key={idx} className={`h-1.5 transition-all duration-500 ${idx === mainImageIndex ? 'w-8 bg-[#f97316]' : 'w-2 bg-black/10'}`} />
                        ))}
                    </div>
                    <span className="text-[8px] tracking-[0.4em] text-black/20 uppercase">Buffer_Status</span>
                </div>

                <button onClick={nextImage} className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 hover:text-[#f97316] transition-colors flex items-center gap-2 group/nav">
                   Next_Node <ChevronRight size={16} className="group-hover/nav:translate-x-1 transition-transform" />
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
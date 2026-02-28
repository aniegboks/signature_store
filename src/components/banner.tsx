'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Banner } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import gsap from 'gsap';
import { PageLoader } from './ui/svg_path_loader';

const BannerSection = ({ banner }: { banner: Banner[] }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Create a ref to track index for GSAP closures
  const indexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentBanner = banner[0];
  const images = currentBanner?.images || [];
  const TOTAL_DURATION = 6;

  // Keep Ref in sync with State
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Entrance for HUD
      gsap.to(".hud-element", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });

      // Gauge Stagger - Fixing the slide trigger logic
      const segments = gsap.utils.toArray<HTMLElement>('.progress-segment');
      gsap.to(segments, {
        backgroundColor: (i) => i > 12 ? "#f97316" : "#ffffff",
        opacity: 1,
        duration: 0.1,
        stagger: TOTAL_DURATION / segments.length,
        repeat: -1,
        onRepeat: () => {
          // Use the current ref value to calculate next slide
          const next = (indexRef.current + 1) % images.length;
          goToSlide(next);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, images.length]); // Added images.length as dependency

  const goToSlide = (next: number) => {
    // Check isAnimating ref/state to prevent double triggers
    if (isAnimating) return;
    setIsAnimating(true);
    
    const tl = gsap.timeline({
      onComplete: () => { 
        setIsAnimating(false); 
      }
    });

    tl.to(imageRef.current, { 
      clipPath: "inset(0% 50% 0% 50%)", 
      filter: "brightness(4) saturate(0)",
      duration: 0.4, 
      ease: "power4.inOut",
      onComplete: () => {
        // Change the actual state exactly when the "shutters" are closed
        setIndex(next);
      }
    })
    .to(imageRef.current, { 
      clipPath: "inset(0% 0% 0% 0%)", 
      filter: "brightness(1) saturate(1.1)",
      duration: 0.8, 
      ease: "expo.out" 
    });
  };

  const manualNext = () => {
    const next = (index + 1) % images.length;
    goToSlide(next);
  };

  return (
    <>
      <PageLoader onFinished={() => setIsLoaded(true)} />

      <div ref={containerRef} className="relative w-full h-screen bg-[#050505] flex items-center justify-center font-mono overflow-hidden">
        
        {/* TELEMETRY */}
        <div className="absolute top-8 w-full px-12 flex justify-between items-center hud-element z-30 opacity-0 translate-y-6">
          <div className="text-[10px] text-white tracking-[0.4em] font-bold uppercase">
              ID_{currentBanner?._id?.slice(0,8)} // STREAM_0{(index + 1)}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] text-white/30 tracking-widest uppercase">Encryption: AES-256</span>
            <div className="size-1.5 bg-orange-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* IMAGE DISPLAY */}
        <div className="relative z-20 hud-element opacity-0 translate-y-6">
          <div ref={imageRef} className="relative w-[320px] lg:w-[480px] aspect-[4/5] bg-neutral-900 border border-white/5 p-1 shadow-2xl">
            {/* Map through images to prevent Next.js flickering/reloading issues */}
            {images.map((img, i) => (
              <div key={i} className={`absolute inset-0 p-1 transition-opacity duration-100 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <Image 
                  src={imageUrl(img).url()} 
                  alt={`Archive View ${i}`} 
                  fill 
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
            
            {/* Corners */}
            <div className="absolute -top-px -left-px size-4 border-t border-l border-orange-500 z-20" />
            <div className="absolute -bottom-px -right-px size-4 border-b border-r border-orange-500 z-20" />
          </div>
        </div>

        {/* SIDE VELOCITY GAUGE */}
        <div className="absolute left-12 h-72 flex flex-col-reverse gap-1.5 hud-element opacity-0 translate-y-6">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="progress-segment w-6 h-[2px] bg-white/5" />
          ))}
          <div className="text-[8px] text-white/20 mb-6 -rotate-90 origin-left translate-x-3 tracking-[0.6em] font-bold">RPM_INDICATOR</div>
        </div>

        {/* BRANDING MODULE */}
        <div className="absolute bottom-12 left-12 hud-element space-y-6 opacity-0 translate-y-6">
          <div className="space-y-2">
            <span className="text-orange-500 text-[10px] tracking-[0.6em] font-bold uppercase">Signature_Archive</span>
            <h1 className="text-5xl lg:text-7xl text-white font-serif italic tracking-tighter leading-none">
              {currentBanner?.name || "The_Collection"}
            </h1>
          </div>
          <div className="max-w-xs border-l border-white/10 pl-6 space-y-3">
             <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-[0.15em]">
               {currentBanner?.description || "High-performance curation meets geometric discipline in the latest digital archive."}
             </p>
             <div className="text-[8px] text-orange-500/50 tracking-widest uppercase">Verified // 2026_CORE</div>
          </div>
        </div>

        {/* PHASE CONTROLS */}
        <div className="absolute bottom-12 right-12 flex flex-col items-end gap-10 hud-element opacity-0 translate-y-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-white/20 tracking-[0.4em] mb-2 uppercase">Current_Phase</span>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-mono italic text-white leading-none">0{index + 1}</span>
              <span className="text-sm text-white/20 font-light">/ 0{images.length}</span>
            </div>
          </div>
          <button 
            onClick={manualNext} 
            className="group relative overflow-hidden h-14 px-12 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10">Next_Phase</span>
            <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </>
  );
};

export default BannerSection;
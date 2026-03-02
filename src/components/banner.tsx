'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Banner } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import gsap from 'gsap';
import { PageLoader } from './ui/svg_path_loader';

const BannerSection = ({ banner }: { banner: Banner[] }) => {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for logic to avoid re-triggering useEffects
  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentBanner = banner[0];
  const images = currentBanner?.images || [];
  const TOTAL_DURATION = 6;

  // STABLE ANIMATION FUNCTION
  const goToSlide = (next: number) => {
    if (isAnimatingRef.current || !imageRef.current) return;
    
    isAnimatingRef.current = true;
    
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    tl.to(imageRef.current, { 
      clipPath: "inset(0% 50% 0% 50%)", 
      filter: "brightness(3) saturate(0)",
      duration: 0.5, 
      ease: "power4.inOut",
      onComplete: () => {
        setIndex(next);
        indexRef.current = next;
      }
    })
    .to(imageRef.current, { 
      clipPath: "inset(0% 0% 0% 0%)", 
      filter: "brightness(1) saturate(1)",
      duration: 0.8, 
      ease: "expo.out" 
    });
  };

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animations
      gsap.to(".hud-element", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Persistent Progress Gauge
      const segments = gsap.utils.toArray<HTMLElement>('.progress-segment');
      gsap.to(segments, {
        backgroundColor: (i) => i > 12 ? "#f97316" : "#ffffff",
        opacity: 1,
        duration: 0.1,
        stagger: TOTAL_DURATION / segments.length,
        repeat: -1,
        onRepeat: () => {
          // Calculate next index using the Ref
          const next = (indexRef.current + 1) % images.length;
          goToSlide(next);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, images.length]); // Removed goToSlide from dependencies to stop the reset loop

  const manualNext = () => manualGoTo((index + 1) % images.length);
  const manualGoTo = (next: number) => goToSlide(next);

  return (
    <>
      <PageLoader onFinished={() => setIsLoaded(true)} />

      <div ref={containerRef} className="relative w-full h-screen bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden">
        
        {/* TOP HUD: TELEMETRY */}
        <div className="absolute top-0 w-full p-6 lg:p-12 flex justify-between items-start hud-element z-30 opacity-0 -translate-y-6">
          <div className="space-y-1">
            <div className="text-[10px] text-white tracking-[0.4em] font-bold uppercase">
              SYS_ID: {currentBanner?._id?.slice(0,8)}
            </div>
            <div className="text-[8px] text-white/40 tracking-widest uppercase">Status: Operational</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-[8px] text-white/30 tracking-widest uppercase">256-BIT_ENCRYPT</span>
            <div className="size-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          </div>
        </div>

        {/* MAIN DISPLAY AREA */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 z-20 w-full px-6">
          
          {/* SIDE GAUGE - Hidden on small mobile to prevent overlap */}
          <div className="hidden lg:flex h-72 flex-col-reverse gap-1.5 hud-element opacity-0 translate-x-[-20px]">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="progress-segment w-6 h-[1px] bg-white/10" />
            ))}
            <div className="text-[8px] text-white/20 mb-6 -rotate-90 origin-left translate-x-3 tracking-[0.6em] font-bold">ARC_VELOCITY</div>
          </div>

          {/* THE IMAGE BOX */}
          <div className="hud-element opacity-0 scale-95 transition-transform duration-700">
            <div ref={imageRef} className="relative w-[280px] sm:w-[350px] lg:w-[420px] aspect-[4/5] bg-neutral-900 border border-white/10 p-1.5 shadow-2xl">
              {images.map((img, i) => (
                <div key={i} className={`absolute inset-0 p-1.5 transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                  <Image 
                    src={imageUrl(img).url()} 
                    alt="Archive" 
                    fill 
                    className="object-cover grayscale-[0.2] contrast-[1.1]"
                    priority={i === 0}
                  />
                </div>
              ))}
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 size-6 border-t-2 border-l-2 border-orange-500 z-20" />
              <div className="absolute -bottom-1 -right-1 size-6 border-b-2 border-r-2 border-orange-500 z-20" />
            </div>
          </div>

          {/* BRANDING - Relative on mobile to prevent stacking */}
          <div className="hud-element space-y-4 lg:space-y-8 max-w-sm text-center lg:text-left opacity-0 translate-x-[20px]">
            <div className="space-y-2">
              <span className="text-orange-500 text-[10px] tracking-[0.5em] font-bold uppercase block">Core_Archive_v1</span>
              <h1 className="text-4xl lg:text-7xl text-white font-serif italic tracking-tighter leading-none">
                {currentBanner?.name || "Collection"}
              </h1>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-widest px-4 lg:px-0 border-white/10 lg:border-l lg:pl-6">
              {currentBanner?.description}
            </p>
          </div>
        </div>

        {/* BOTTOM HUD: CONTROLS */}
        <div className="absolute bottom-0 w-full p-6 lg:p-12 flex flex-row items-end justify-between hud-element z-30 opacity-0 translate-y-6">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/20 tracking-[0.4em] mb-2 uppercase">Frame_Index</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl lg:text-7xl font-mono italic text-white leading-none">0{index + 1}</span>
              <span className="text-xs lg:text-sm text-white/20 font-light">/ 0{images.length}</span>
            </div>
          </div>

          <button 
            onClick={manualNext} 
            className="group relative overflow-hidden h-12 lg:h-16 px-8 lg:px-14 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase transition-all"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">Manual_Shift</span>
            <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-50 bg-[length:100%_2px,3px_100%]" />
      </div>
    </>
  );
};

export default BannerSection;
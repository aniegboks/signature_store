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

  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentBanner = banner[0];
  const images = currentBanner?.images || [];
  const TOTAL_DURATION = 7;

  const goToSlide = (next: number) => {
    if (isAnimatingRef.current || !imageRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimatingRef.current = false; }
    });

    tl.to(imageRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      opacity: 0.4,
      duration: 0.6,
      ease: "power2.inOut",
      force3D: true,
      onComplete: () => {
        setIndex(next);
        indexRef.current = next;
      }
    })
      .to(imageRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        force3D: true
      });
  };

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.to(".gallery-element", { opacity: 1, y: 0, x: 0, duration: 1.2, stagger: 0.15, ease: "power2.out" });
      const progressLine = document.querySelector('.progress-fill');
      if (progressLine) {
        gsap.fromTo(progressLine, { scaleY: 0 }, {
          scaleY: 1, duration: TOTAL_DURATION, ease: "none", repeat: -1, transformOrigin: "top center",
          onRepeat: () => { const next = (indexRef.current + 1) % images.length; goToSlide(next); }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isLoaded, images.length]);

  return (
    <>
      <PageLoader onFinished={() => setIsLoaded(true)} />
      {/* Light background: bg-[#FDFBF7] (Cream), Text: text-[#1A1A1A] (Charcoal) */}
      <div ref={containerRef} className="carousel-container relative w-full min-h-[75dvh] pt-32 pb-12 bg-[#FAFAFA] text-[#1A1A1A] flex flex-col items-center justify-center font-sans overflow-hidden">

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 z-20 w-full px-6 max-w-[1400px] mx-auto flex-1">

          <div className="hidden lg:flex h-56 flex-col items-center justify-center gallery-element opacity-0 -translate-x-4">
            <div className="w-[1px] h-32 bg-black/10 relative overflow-hidden">
              <div className="progress-fill absolute top-0 w-full h-full bg-[#1A1A1A]" />
            </div>
          </div>

          <div className="gallery-element opacity-0">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[420px] aspect-[4/5] bg-[#FAFAFA] p-2 md:p-3 shadow-xl">
              <div ref={imageRef} className="relative w-full h-full overflow-hidden bg-neutral-200">
                {images.map((img, i) => (
                  <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <Image src={imageUrl(img).url()} alt={currentBanner?.name || "Artwork"} fill className="object-cover" priority={i === 0} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="gallery-element space-y-6 max-w-md text-center lg:text-left opacity-0 translate-x-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-[1.1] font-light">
              {currentBanner?.name || "The Collection"}
            </h1>
            <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-light px-4 lg:px-0 font-body">
              {currentBanner?.description || "An exploration of form, light, and narrative."}
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-12 flex flex-row items-end justify-between gallery-element z-30 opacity-0 translate-y-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 font-serif">
              <span className="text-3xl lg:text-4xl leading-none tabular-nums font-light">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-xs lg:text-sm text-[#1A1A1A]/30 italic">/ {String(images.length).padStart(2, '0')}</span>
            </div>
          </div>

          <button onClick={() => goToSlide((index + 1) % images.length)} className="group relative overflow-hidden h-10 lg:h-12 px-8 border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/60 text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase transition-all duration-500">
            <span className="relative z-10">Next Look</span>
            <div className="absolute inset-0 bg-[#1A1A1A]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
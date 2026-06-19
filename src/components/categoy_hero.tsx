'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/container';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  title: string;
  subtitle?: string;
}

const CategoryHero = ({ title, subtitle }: HeroProps) => {
  const containerRef = useRef<HTMLSelectElement>(null);

  useGSAP(() => {
    // We create a master timeline to choreograph the entire sequence
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.4 }
    });

    // 1. The H1 Title: Slides up from an invisible mask
    tl.fromTo(
      '.hero-title',
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: 'expo.out' }
    )

      // 2. The Subtitle: Fades and slides slightly, starting just before the title finishes
      .fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=1.2'
      )

      // 3. The Grid Container: Fades in the borders smoothly
      .fromTo(
        '.editorial-grid',
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        '-=1'
      )

      // 4. Staggered Column Content (Text): Animates the labels and paragraphs inside the grid
      .fromTo(
        '.col-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        '-=1.5'
      )

      // 5. Cinematic Image Reveal: Mask opens from bottom-to-top
      .fromTo(
        '.img-wrapper',
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, ease: 'expo.inOut', stagger: 0.15 },
        '-=1.2'
      )

      // 6. Image Scale: As the mask opens, the image scales down from 1.4 to 1.0 (The "Studio" effect)
      .fromTo(
        '.img-inner',
        { scale: 1.4 },
        { scale: 1, duration: 2, ease: 'power3.out', stagger: 0.15 },
        '<' // The '<' synchronizes this animation exactly with the clipPath animation above it
      );

  }, { scope: containerRef }); // Scoping ensures GSAP only targets elements within this component

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FAFAFA] text-white overflow-hidden pt-32 pb-12 invisible-until-mounted"
    >
      {/* Prevent FOUC (Flash of Unstyled Content) by setting a global class if needed, though opacity usually handles it */}

      {/* --- SUBTLE BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFAFA] z-10" />
      </div>

      <Container>
        <div className="relative z-20 flex flex-col gap-16 lg:gap-24">

          {/* ── TOP: EDITORIAL TYPOGRAPHY GRID ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

            {/* LEFT: Large H1 Title */}
            <div className="lg:col-span-7 xl:col-span-8 overflow-hidden pb-4">
              <h1 className="hero-title text-5xl md:text-6xl lg:text-[6rem] font-heading tracking-tight leading-[0.85] capitalize text-neutral-900">
                {title}
              </h1>
            </div>

            {/* RIGHT: Paragraph & Meta */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col lg:pb-3">
              <p className="hero-subtitle font-body text-base md:text-sm text-neutral-500 font-light leading-relaxed max-w-md">
                {subtitle || "A study in drape, weight, and silhouette. Engineered for longevity and effortless movement."}
              </p>
            </div>

          </div>

          {/* ── BOTTOM: CINEMATIC RECTANGULAR ANCHOR IMAGE ── */}
          <div className="editorial-grid w-full max-w-7xl mx-auto text-neutral-900 font-sans pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200/60 border-t border-neutral-200/60">

              {/* --- Column 1: Brand Strategy --- */}
              <div className="p-8 lg:p-12 flex flex-col h-full">
                <h3 className="col-text text-[10px] font-semibold text-neutral-500 tracking-[0.15em] uppercase mb-16 lg:mb-24">
                  01 Brand Strategy
                </h3>

                <p className="col-text text-md lg:text-sm leading-snug text-neutral-500 mb-24 max-w-[280px] font-body">
                  Building meaningful visual systems through research and clarity.
                </p>

                {/* Image Setup */}
                <div className="img-wrapper mt-auto relative w-full aspect-[4/3] bg-neutral-100 rounded-sm overflow-hidden">
                  <div className="img-inner w-full h-full relative">
                    <Image src={'/assets/images/img-10.jpg'} alt='' fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* --- Column 2: Digital Design --- */}
              <div className="p-8 lg:p-12 flex flex-col h-full">
                <h3 className="col-text text-[10px] font-semibold text-neutral-500 tracking-[0.15em] uppercase mb-16">
                  02 Digital Design
                </h3>

                {/* Image Setup */}
                <div className="img-wrapper relative w-full aspect-square bg-black rounded-sm overflow-hidden mb-16">
                  <div className="img-inner w-full h-full relative">
                    <Image src={'/assets/images/img-8.jpg'} alt='' fill className="object-cover" />
                  </div>
                </div>

                <p className="col-text mt-auto text-sm text-neutral-500 leading-relaxed max-w-[280px] font-body">
                  Creating interfaces that balance usability, typography, and visual rhythm.
                </p>
              </div>

              {/* --- Column 3: Art Direction --- */}
              <div className="p-8 lg:p-12 flex flex-col h-full">
                <h3 className="col-text text-[10px] font-semibold text-neutral-500 tracking-[0.15em] uppercase mb-16">
                  03 Art Direction
                </h3>

                <p className="col-text text-sm text-neutral-500 leading-relaxed max-w-[280px] mb-16 font-body">
                  Every element exists with intention, spacing, and visual balance.
                </p>

                {/* Image Setup */}
                <div className="img-wrapper mt-auto relative w-full aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden">
                  <div className="img-inner w-full h-full relative">
                    <Image src={'/assets/images/img-6.jpg'} alt='' fill className="object-cover" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CategoryHero;
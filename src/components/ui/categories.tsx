'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_CATEGORIES_QUERYResult } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Container from './container';

gsap.registerPlugin(ScrollTrigger);

type CategoriesProps = {
  featuredCategories: FEATURED_CATEGORIES_QUERYResult;
};

const Categories = ({ featuredCategories }: CategoriesProps) => {
  const componentRoot = useRef<HTMLDivElement>(null);
  const needleRef = useRef<SVGLineElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. SPEEDOMETER NEEDLE ANIMATION
      gsap.to(needleRef.current, {
        rotation: 180,
        transformOrigin: "bottom center",
        ease: "none",
        scrollTrigger: {
          trigger: componentRoot.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
        }
      });

      // 2. STRIP REVEAL
      gsap.utils.toArray<HTMLDivElement>('.category-strip').forEach((strip) => {
        console.log(`strip is: ${strip}`);
        gsap.from(strip?.querySelector('.strip-inner'), {
          scaleX: 0.95,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: strip,
            start: "top 90%",
          }
        });
      });
    }, componentRoot);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRoot} className="w-full py-40 bg-[#fcfcfc] relative overflow-hidden">
      
      {/* --- SPEEDOMETER GAUGE BACKGROUND --- */}
      <div className="absolute top-20 left-[-5%] opacity-[0.03] pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 200 100" fill="none" className="overflow-visible">
          <path d="M20 100 A 80 80 0 0 1 180 100" stroke="black" strokeWidth="0.5" strokeDasharray="2 2" />
          {[...Array(11)].map((_, i) => (
            <line 
              key={i}
              x1="100" y1="20" x2="100" y2="25"
              stroke="black"
              strokeWidth="1"
              style={{ transform: `rotate(${i * 18 - 90}deg)`, transformOrigin: '100px 100px' }}
            />
          ))}
          <line 
            ref={needleRef}
            x1="100" y1="100" x2="100" y2="30" 
            stroke="#f97316"
            strokeWidth="1.5"
            style={{ transform: `rotate(-90deg)` }}
          />
          <circle cx="100" cy="100" r="4" fill="black" />
        </svg>
      </div>

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-orange-500" />
                <span className="text-[10px] font-mono tracking-[0.8em] text-black/30 uppercase">
                    Velocity_Index // Archive
                </span>
            </div>
            <h3 className="text-7xl md:text-9xl font-serif font-light tracking-tighter leading-none text-black">
              Aesthetic <br /> 
              <span className="italic text-neutral-300 ml-16">Metrics.</span>
            </h3>
          </div>
          <div className="flex flex-col items-end text-right">
             <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-neutral-400 max-w-[220px] leading-relaxed">
               Calibrating textile weight, visual density, and structural integrity.
             </p>
          </div>
        </div>

        {/* The Strip Grid */}
        <div className="space-y-2 relative z-10">
          {featuredCategories.map((category, index) => {
            const img = category.image?.asset ? imageUrl(category.image).url() : null;

            return (
              <div key={category._id} className="category-strip group relative">
                <Link href={`/category/${category.slug?.current}`} className="block">
                  <div className="strip-inner relative h-[25vh] md:h-[22vh] w-full bg-white overflow-hidden flex items-center border-y border-black/[0.03] group-hover:border-black/10 transition-colors duration-500">
                    
                    {/* --- PERSISTENT IMAGE BOX --- */}
                    {/* Changed from w-0 to w-1/3 or w-1/2 for static visibility */}
                    <div className="absolute right-0 top-0 h-full w-[40%] md:w-[30%] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                        {img && (
                          <Image
                              src={img}
                              alt={category.title || ''}
                              fill
                              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                          />
                        )}
                        {/* Technical Overlay Line */}
                        <div className="absolute inset-0 border-l border-black/5" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 w-full px-8 md:px-12 flex items-center">
                      <div className="flex items-center gap-12">
                        {/* SPEC Label */}
                        <span className="text-black/10 font-mono text-[10px] group-hover:text-orange-500 transition-colors duration-500">
                          SPEC_{String(index + 1).padStart(2, '0')}
                        </span>
                        {/* Title */}
                        <h4 className="text-4xl md:text-6xl font-serif text-black tracking-tighter group-hover:pl-4 transition-all duration-500 group-hover:italic">
                          {category.title}
                        </h4>
                      </div>

                      {/* Spacer to push some HUD elements if needed */}
                      <div className="ml-auto flex items-center gap-6 pr-[40%] md:pr-[30%]">
                          <span className="hidden lg:block text-[7px] font-mono text-black/10 tracking-[0.4em] uppercase group-hover:text-black/40 transition-colors">
                            DATA_SET_STABLE
                          </span>
                          <div className="size-8 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                             <div className="size-1 bg-black group-hover:bg-white rounded-full" />
                          </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Status Footer */}
        <div className="mt-24 flex justify-between items-center border-t border-black/5 pt-8">
            <div className="flex items-center gap-2">
                <div className="size-1 bg-orange-500 animate-pulse" />
                <span className="text-[8px] font-mono tracking-widest text-black/40 uppercase">Calibration_Stable</span>
            </div>
            <Link href="/shop" className="group flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.6em] text-black hover:text-orange-500 transition-colors font-mono">Full_Scan</span>
            </Link>
        </div>
      </Container>
    </section>
  );
};

export default Categories;
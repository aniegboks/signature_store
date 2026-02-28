'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image Reveal Logic
      gsap.utils.toArray<HTMLElement>('.image-container').forEach((container) => {
        const image = container.querySelector('img');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(container, 
          { clipPath: "inset(100% 0% 0% 0%)" }, 
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }
        )
        .fromTo(image, 
          { scale: 1.4, filter: "blur(10px)" }, 
          { scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, 
          "-=1" // Overlaps with the clipPath animation
        );
      });

      // Subtle Text Parallax
      gsap.utils.toArray<HTMLElement>('.text-box').forEach((text) => {
        gsap.to(text, {
          y: -30,
          scrollTrigger: {
            trigger: text,
            start: "top bottom",
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-40 selection:bg-neutral-900 selection:text-white">
      
      {/* CHAPTER 01 */}
      <div className="max-w-4xl mx-auto px-6 mb-80 flex flex-col md:flex-row items-center justify-between gap-16">
        
        <div className="text-box w-full md:w-[45%] space-y-6">
          <span className="text-[7px] font-mono tracking-[0.6em] text-neutral-300 uppercase">Archive // 01</span>
          <h2 className="text-3xl lg:text-4xl font-serif italic text-neutral-900 leading-tight">
            The Geometry <br /> of Movement.
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] leading-loose text-neutral-400 max-w-[240px] font-light">
            Architectural structure meets fluid form. Precision in every calculated line.
          </p>
        </div>

        {/* Masked Image Container */}
        <div className="image-container w-[260px] lg:w-[300px] aspect-[3/4] relative overflow-hidden bg-neutral-50 border-[0.5px] border-neutral-100 shadow-sm">
          <Image 
            src="/assets/images/img-1.png"
            alt="Editorial" 
            fill 
            className="object-cover grayscale"
          />
        </div>
      </div>

      {/* CHAPTER 02 */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center justify-between gap-16">
        
        <div className="text-box w-full md:w-[45%] space-y-6 md:pl-10">
          <span className="text-[7px] font-mono tracking-[0.6em] text-neutral-300 uppercase">Process // 02</span>
          <h2 className="text-3xl lg:text-4xl font-serif italic text-neutral-900 leading-tight">
            Tactile <br /> Permanence.
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] leading-loose text-neutral-400 max-w-[240px] font-light">
            Sourced for longevity. Utilizing high-density weaves that improve with age.
          </p>
        </div>

        {/* Masked Image Container */}
        <div className="image-container w-[260px] lg:w-[300px] aspect-[3/4] relative overflow-hidden bg-neutral-50 border-[0.5px] border-neutral-100 shadow-sm">
          <Image 
            src="/assets/images/img-2.png"
            alt="Detail" 
            fill 
            className="object-cover grayscale"
          />
        </div>
      </div>

    </section>
  );
};

export default About;
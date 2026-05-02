'use client';

import React, { useState, useEffect } from 'react';
import { ALL_TESTIMONIALS_QUERYResult } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type TestimonialsProps = {
  testimonials: ALL_TESTIMONIALS_QUERYResult;
};

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 8000;

  useEffect(() => {
    if (!testimonials || !testimonials.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }, duration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (duration / 100)), 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [activeIndex, testimonials?.length, testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[activeIndex];
  const img = current?.image?.asset ? imageUrl(current.image).url() : null;

  // Custom refined easing for Awwwards-style smooth motion
  const elegantEasing: [number, number, number, number] = [0.25, 1, 0.5, 1];

  return (
    <section className="bg-neutral-50 min-h-[60dvh] flex items-center justify-center overflow-hidden py-12">

      <div className="w-full max-w-[1200px] px-6 relative z-10">

        {/* --- EDITORIAL BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-6 h-auto md:h-[500px] border border-black/[0.06] bg-white">

          {/* TILE 1: THE PORTRAIT (Spans left 1/3) */}
          <div className="md:col-span-4 md:row-span-6 relative overflow-hidden bg-neutral-100 border-b md:border-b-0 md:border-r border-black/[0.06]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: elegantEasing }}
                className="w-full h-full relative"
              >
                {img && (
                  <Image
                    src={img}
                    alt={current?.socialHandle || "Client portrait"}
                    fill
                    className="object-cover transition-transform duration-[8000ms] ease-linear hover:scale-105"
                  />
                )}
                {/* Subtle overlay for text contrast if needed */}
                <div className="absolute inset-0 bg-black/[0.02]" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* TILE 2: THE QUOTE (Spans top right 2/3) */}
          <div className="md:col-span-8 md:row-span-4 flex flex-col justify-center p-8 md:p-16 border-b border-black/[0.06] relative bg-white">
            <div className="absolute top-8 left-8 md:left-16 text-xs tracking-[0.2em] uppercase text-neutral-400">
              Client Experience
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: elegantEasing }}
                className="mt-8"
              >
                <p className="text-sm text-neutral-600 leading-[2.2] font-light max-w-2xl">
                  &quot;{current?.testimonial}&quot;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px w-8 bg-neutral-300" />
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-900 font-medium">
                    {current?.socialHandle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* TILE 3: HUMAN ELEMENT (Spans bottom middle) */}
          <div className="md:col-span-4 md:row-span-2 bg-[#FDFDFD] border-b md:border-b-0 md:border-r border-black/[0.06] flex items-center justify-center p-8">
            <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px]">
              Cultivating meaningful partnerships through <span className="text-neutral-800">creativity</span> and intentional design.
            </p>
          </div>

          {/* TILE 4: REFINED PROGRESS (Spans bottom right) */}
          <div className="md:col-span-4 md:row-span-2 bg-white flex flex-col justify-center p-8 md:px-12">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">Pacing</span>
              <span className="text-xs text-neutral-300 tracking-widest">
                0{activeIndex + 1} / 0{testimonials.length}
              </span>
            </div>
            <div className="h-[1px] w-full bg-black/[0.04] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-neutral-800"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </div>

        </div>

        {/* --- MINIMAL NAV --- */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setProgress(0); }}
              className="py-2 group"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <div
                className={`h-[1px] transition-all duration-700 ease-out ${activeIndex === i
                  ? 'w-10 bg-neutral-800'
                  : 'w-4 bg-black/[0.08] group-hover:bg-black/[0.2] group-hover:w-6'
                  }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
'use client';

import React, { useState, useEffect } from 'react';
import { ALL_TESTIMONIALS_QUERYResult } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Activity, Zap } from 'lucide-react';

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

  return (
    <section className="bg-[#fcfcfc] h-[60dvh] flex items-center justify-center overflow-hidden relative border-y border-black/[0.03]">
      
      {/* --- LUXE BACKGROUND ELEMENTS --- */}
      <div className="w-full max-w-[1400px] px-8 relative z-10">
        
        {/* Adjusted Height from 650px to 450px for the 60dvh fit */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-2 h-auto md:h-[450px]">
          
          {/* TILE 1: THE PORTRAIT */}
          <div className="md:col-span-3 md:row-span-6 relative overflow-hidden bg-neutral-100 border border-black/[0.03]">
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full h-full relative"
                >
                    {img && (
                      <Image 
                        src={img} 
                        alt="" 
                        fill 
                        className={`object-cover transition-all duration-1000 ${progress > 50 ? 'grayscale-0' : 'grayscale'}`} 
                      />
                    )}
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="size-1 bg-orange-500 rounded-full" />
                <div className="text-[6px] font-mono text-black/30 tracking-[0.5em] uppercase">Visual_Record</div>
              </div>
          </div>

          {/* TILE 2: THE QUOTE */}
          <div className="md:col-span-6 md:row-span-4 bg-white border border-black/[0.05] p-10 flex flex-col justify-between relative">
              <div className="flex justify-between items-start">
                <span className="text-[7px] font-mono tracking-[0.6em] text-orange-500 uppercase">Input_Log</span>
                <Zap size={12} className="text-black/10" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light italic max-w-md">
                      {current?.testimonial}
                    </p>
                    <div className="mt-4">
                        <span className="text-black font-mono text-[8px] uppercase tracking-[0.4em]">
                         &quot;{current?.socialHandle}&quot;
                        </span>
                    </div>
                </motion.div>
              </AnimatePresence>
              <div className="h-px w-full bg-black/[0.03]" />
          </div>

          {/* TILE 3: TELEMETRY */}
          <div className="md:col-span-3 md:row-span-3 bg-neutral-900 p-6 flex flex-col justify-between border border-white/5">
              <Activity size={14} className="text-orange-500" />
              <div>
                  <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em] mb-1">Stability</div>
                  <div className="text-lg font-mono text-white tracking-tighter">99.8%</div>
              </div>
          </div>

          {/* TILE 4: SCAN BAR */}
          <div className="md:col-span-3 md:row-span-3 bg-white border border-black/[0.05] p-6 flex flex-col justify-between">
              <div className="space-y-3">
                  <div className="h-[1px] w-full bg-black/[0.03] relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-orange-500" 
                        animate={{ width: `${progress}%` }} 
                        transition={{ ease: "linear" }}
                      />
                  </div>
                  <div className="text-[7px] font-mono text-black/30 uppercase tracking-[0.3em]">Syncing_Stream</div>
              </div>
          </div>

          {/* TILE 5: AUTHENTICATION */}
          <div className="md:col-span-6 md:row-span-2 border border-black/[0.05] bg-white flex items-center px-10">
              <div className="flex items-center gap-4">
                <Fingerprint size={16} strokeWidth={1} className="text-black/40" />
                <span className="text-[8px] font-mono tracking-[0.6em] text-black uppercase opacity-40">Terminal_Verified_2026</span>
              </div>
          </div>

        </div>

        {/* --- MINIMAL NAV --- */}
        <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                  <button
                      key={i}
                      onClick={() => { setActiveIndex(i); setProgress(0); }}
                      className={`h-[1px] transition-all duration-500 ${activeIndex === i ? 'w-6 bg-orange-500' : 'w-3 bg-black/10'}`}
                  />
              ))}
            </div>
            <div className="text-[7px] font-mono text-black/20 uppercase tracking-[0.5em]">
              0{activeIndex + 1} / {testimonials.length}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
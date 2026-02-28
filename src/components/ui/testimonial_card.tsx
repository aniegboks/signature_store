'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Quote, Fingerprint } from 'lucide-react';

type TestimonialsCardProps = {
  title: string;
  description: string;
  className?: string;
  testimonial?: string;
  children: React.ReactNode;
};

const TestimonialCard = ({
  title,
  description,
  testimonial,
  children,
  className,
}: TestimonialsCardProps) => {
  return (
    <div className={twMerge(
      'relative overflow-hidden border border-black/5 bg-white p-10 group transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)]',
      className
    )}>
      {/* Visual Identity Node */}
      <div className="flex justify-between items-start mb-12">
        <div className="size-12 overflow-hidden border border-black/5 p-1">
          {children}
        </div>
        <Fingerprint size={16} strokeWidth={1} className="text-black/10 group-hover:text-orange-500 transition-colors" />
      </div>

      <div className="space-y-8">
        {/* Testimonial Quote: Small, Italic, Clean */}
        <p className="text-xl md:text-2xl font-serif italic font-light text-black/80 leading-relaxed tracking-tight">
          "{testimonial || "The level of precision in the textile weave is unparalleled. A true system of luxury."}"
        </p>

        <div className="pt-8 border-t border-black/[0.03]">
          <h3 className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-black">
            {title}
          </h3>
          <p className="text-[9px] font-mono text-black/30 uppercase tracking-widest mt-1">
            Verified_Client // {description}
          </p>
        </div>
      </div>

      {/* Decorative Technical Label */}
      <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[7px] font-mono text-orange-500/40 uppercase tracking-[1em]">Spec_Confirmed</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
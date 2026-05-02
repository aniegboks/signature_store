'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RevealAnimation } from '@/utils/reveal_animation';
import Container from './ui/container';
import Image from 'next/image';

const BentoCard = ({
  title,
  description,
  children,
  className = "",
  metric = ""
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  metric?: string;
}) => (
  <div className={`relative overflow-hidden bg-white border border-black/[0.04] p-10 flex flex-col group transition-colors duration-700 hover:bg-neutral-50 ${className}`}>

    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        {metric && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 block">
            {metric}
          </span>
        )}
        <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-neutral-900 leading-none">
          {title}
        </h3>
      </div>

      <p className="text-neutral-500 text-sm mt-8 max-w-[200px] leading-relaxed font-light">
        {description}
      </p>
    </div>

    {/* Absolute positioned visual elements */}
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
      {children}
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-32 bg-[#FAFAFA]">
      <RevealAnimation>
        <Container>

          {/* Section Header: Strictly Editorial */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.06] pb-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-neutral-900 leading-none">
                Structural <br />
                <span className="italic font-serif text-neutral-400">Garments.</span>
              </h2>
            </div>
            <div className="max-w-[200px] text-right hidden md:block">
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Engineered silhouettes. Heavyweight textiles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 auto-rows-[380px]">

            {/* 1. THE SILHOUETTE (3x2) */}
            <div className="md:col-span-3 md:row-span-2 relative group overflow-hidden">
              <BentoCard
                metric="Form & Drape"
                title="The Drop Shoulder."
                description="Architectural draping designed for effortless movement."
                className="h-full bg-[#FDFDFD]"
              >
                {/* Abstract representation of a pattern/cut */}
                <div className="absolute right-12 bottom-12 w-64 h-64 border border-black/[0.03] rounded-full flex items-center justify-center scale-110 group-hover:scale-105 transition-transform duration-1000 ease-out">
                  <div className="w-full h-[1px] bg-black/[0.03] absolute" />
                  <div className="h-full w-[1px] bg-black/[0.03] absolute" />
                  <div className="w-48 h-48 border border-black/[0.03] rounded-full" />
                </div>
              </BentoCard>
            </div>

            {/* 2. THE WEIGHT (3x1) */}
            <BentoCard
              metric="Textile Weight"
              title="500 GSM."
              description="Dense, custom-milled French Terry for unparalleled structure."
              className="md:col-span-3 md:row-span-1"
            >
              {/* Minimal "Weight/Density" Visual */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 flex gap-1 h-12">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ backgroundColor: "#f5f5f5" }}
                    whileInView={{ backgroundColor: i < 6 ? "#262626" : "#f5f5f5" }}
                    transition={{ delay: i * 0.1 }}
                    className="w-1 h-full rounded-full"
                  />
                ))}
              </div>
            </BentoCard>

            {/* 3. CONSTRUCTION (2x1) */}
            <BentoCard
              metric="Durability"
              title="Twin-Needle."
              description="Reinforced binding at critical stress points."
              className="md:col-span-2 md:row-span-1"
            >
              {/* Minimal "Stitch" Visual */}
              <div className="absolute bottom-12 right-10 flex flex-col gap-2">
                <div className="w-24 h-[2px] bg-black/[0.08]" />
                <div className="w-24 h-[2px] bg-black/[0.08]" />
              </div>
            </BentoCard>

            {/* 4. TEXTURE (1x1) */}
            <BentoCard
              metric="Finish"
              title="Grain."
              description="Garment dyed."
              className="md:col-span-1 md:row-span-1 border-none p-0 overflow-hidden group"
            >
              {/* Replace with an actual close-up of hoodie fabric */}
              <div className="absolute inset-0 bg-neutral-200">
                <Image
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"
                  alt="Heavyweight cotton texture"
                  fill
                  className="object-cover grayscale contrast-125 opacity-80 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:bg-transparent" />
              </div>

              {/* Text overlay for the image card */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white mix-blend-difference">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">Finish</span>
                <div>
                  <h3 className="text-2xl font-serif tracking-tight leading-none mb-2">Grain.</h3>
                  <p className="text-xs font-light opacity-80">Garment dyed.</p>
                </div>
              </div>
            </BentoCard>

          </div>
        </Container>
      </RevealAnimation>
    </section>
  );
};

export default FeaturesSection;
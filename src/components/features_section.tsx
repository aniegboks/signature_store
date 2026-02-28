'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { RevealAnimation } from '@/utils/reveal_animation';
import Container from './ui/container';
import Image from 'next/image';
import { Scan, Cpu, Layers, Box, Activity, Compass } from 'lucide-react';

const BentoCard = ({ 
  title, 
  description, 
  children, 
  className = "", 
  tag = "Archive" 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  className?: string; 
  tag?: string;
}) => (
  <div className={`relative overflow-hidden bg-white border border-black/[0.06] p-8 flex flex-col group transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] ${className}`}>
    {/* Micro-HUD Corners (Black in Light Mode) */}
    <div className="absolute top-0 left-0 size-[1px] bg-black/20 group-hover:w-6 group-hover:bg-orange-500 transition-all duration-500" />
    <div className="absolute bottom-0 right-0 size-[1px] bg-black/20 group-hover:h-6 group-hover:bg-orange-500 transition-all duration-500" />
    
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[9px] uppercase tracking-[0.6em] text-black/30 font-mono flex items-center gap-2">
          <div className="size-1 bg-orange-500 rounded-full" />
          REF_{tag}
        </span>
        <div className="text-[8px] text-black/20 font-mono tracking-widest">SYSTEM_STABLE // 00:24</div>
      </div>
      <h3 className="text-2xl font-light tracking-tighter text-black leading-none uppercase">
        {title}
      </h3>
      <p className="text-black/40 text-[10px] mt-3 max-w-[28ch] leading-relaxed uppercase tracking-widest font-mono">
        {description}
      </p>
    </div>
    
    <div className="mt-6 flex-1 flex items-center justify-center relative min-h-[140px]">
      {children}
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-40 bg-[#fcfcfc] text-black border-t border-black/[0.03]">
      <RevealAnimation>
        <Container>
          {/* Section Header: Minimalist Studio Look */}
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.06] pb-16">
            <div className="space-y-6">
               <div className="flex gap-2">
                  <div className="h-[1px] w-8 bg-orange-500 mt-2" />
                  <span className="text-[10px] font-mono tracking-[0.5em] text-black/40 uppercase">Aero_Intelligence_Hub</span>
               </div>
               <h2 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.8]">
                Titan <br /> 
                <span className="italic font-serif text-black/10">Engineering.</span>
               </h2>
            </div>
            
            <div className="text-[10px] text-black/30 font-mono tracking-[0.5em] text-right mt-8 md:mt-0 leading-loose">
              [ APPAREL_SYSTEM_V.2 ] <br /> 
              <span className="text-orange-600/60">NODE_LAT: 51.5074 N</span> <br />
              GLOBAL_LOGISTICS_STABLE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 auto-rows-[360px]">
            
            {/* 1. THE BLUEPRINT (Light Studio Mode) */}
            <div className="md:col-span-3 md:row-span-2 relative group overflow-hidden">
                <BentoCard 
                    tag="STRUCTURE"
                    title="Anatomical Hoodie" 
                    description="Heavyweight 500GSM weave mapped for movement."
                    className="h-full bg-white"
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Light Blueprint Grid */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
                        
                        <div className="relative z-10 w-64 h-80 border border-black/[0.05] p-4 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                           <Scan className="absolute top-0 left-0 text-orange-500/40" size={24} strokeWidth={1} />
                           
                           <div className="w-full h-full border border-black/[0.03] flex items-center justify-center relative overflow-hidden">
                              <Layers className="text-black/[0.03] group-hover:text-orange-500/10 transition-all duration-1000 scale-150" size={120} strokeWidth={0.5} />
                              
                              {/* Technical Callouts */}
                              <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                 <div className="w-[80%] h-[1px] bg-black/[0.05] rotate-45" />
                                 <div className="w-[80%] h-[1px] bg-black/[0.05] -rotate-45" />
                              </motion.div>
                           </div>

                           <div className="absolute -right-16 top-1/4 space-y-3 font-mono text-[7px] text-black/30 text-right">
                              <span className="flex items-center justify-end gap-2">REINFORCED_SEAM <div className="size-1 bg-black/10 rounded-full" /></span>
                              <span className="flex items-center justify-end gap-2">ARTICULATED_ELBOW <div className="size-1 bg-black/10 rounded-full" /></span>
                              <span className="flex items-center justify-end gap-2 text-orange-500/50 font-bold">TECH_POCKET_v2 <div className="size-1 bg-orange-500/50 rounded-full" /></span>
                           </div>
                        </div>
                    </div>
                </BentoCard>
            </div>

            {/* 2. ATELIER CAPACITY (Chalk White Layout) */}
            <BentoCard 
                tag="INVENTORY"
                title="Atelier Output" 
                description="Current production cycle at peak efficiency."
                className="md:col-span-3 md:row-span-1"
              >
                <div className="w-full max-w-sm px-4">
                    <div className="flex justify-between text-[8px] font-mono mb-4 text-black/30 tracking-[0.4em]">
                        <span>LOAD_LVL</span>
                        <span className="text-orange-600 font-bold">STABLE_OUTPUT</span>
                        <span>98.4%</span>
                    </div>
                    {/* Segmented Loading Bar - Light Version */}
                    <div className="flex gap-2 h-2">
                        {[...Array(15)].map((_, i) => (
                            <motion.div 
                                key={i}
                                initial={{ backgroundColor: "#f0f0f0" }}
                                whileInView={{ backgroundColor: i < 12 ? "#000" : "#f0f0f0" }}
                                transition={{ delay: i * 0.05 }}
                                className="flex-1 h-full"
                            />
                        ))}
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-6 border-t border-black/[0.05] pt-6 font-mono text-[8px] text-black/20 uppercase tracking-[0.4em]">
                        <div className="flex items-center gap-2"><Activity size={10} /> Active</div>
                        <div className="flex items-center gap-2"><Cpu size={10} /> 12/12</div>
                        <div className="flex items-center gap-2 text-orange-600/40">Verified</div>
                    </div>
                </div>
            </BentoCard>

            {/* 3. LOGISTICS DATA */}
            <BentoCard 
              tag="DISTRIBUTION"
              title="Global Nodes" 
              description="Seamless logistics to 40+ regions."
              className="md:col-span-2 md:row-span-1"
            >
              <div className="flex flex-col items-center gap-6">
                 <Compass size={40} strokeWidth={0.5} className="text-black/10 animate-spin-slow" />
                 <div className="text-5xl font-light tracking-tighter text-black italic">40.00<span className="text-xs text-black/20 not-italic ml-2 tracking-widest uppercase">Nodes</span></div>
                 <div className="w-16 h-[1px] bg-black/[0.08]" />
              </div>
            </BentoCard>

            {/* 4. TEXTILE FEED (Higher contrast) */}
            <BentoCard 
              tag="SENSORY"
              title="Texture" 
              description="Visual touch."
              className="md:col-span-1 md:row-span-1"
            >
              <div className="absolute inset-0 grayscale brightness-110 hover:brightness-100 hover:grayscale-0 transition-all duration-1000">
                 <Image src="/assets/about/img1.jpg" alt="Fashion Detail" fill className="object-cover" />
                 {/* Visual HUD overlay */}
                 <div className="absolute inset-4 border border-white/20 pointer-events-none mix-blend-difference" />
              </div>
            </BentoCard>

          </div>
        </Container>
      </RevealAnimation>

      <style jsx global>{`
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
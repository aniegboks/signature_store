import React from 'react';
import { Gauge, Zap, Activity } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle?: string;
}

const CategoryHero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="relative h-[65dvh] w-full bg-[#050505] overflow-hidden flex items-center border-b border-white/5">
      
      {/* --- ENGINE SCHEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        {/* Animated Turbine Arc */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 size-[700px] border border-white/[0.02] rounded-full flex items-center justify-center">
            <div className="size-[500px] border border-orange-500/10 rounded-full border-dashed animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-transparent to-[#050505] z-10" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: PRIMARY DATA */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-2 py-1 bg-white text-black font-mono text-[9px] uppercase tracking-widest">
                    <Activity size={10} className="animate-pulse" />
                    Archive_Verified
                </div>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Ref // {title.slice(0, 3)}_SPEC</span>
            </div>
            
            <div className="space-y-4">
                <h1 className="text-7xl md:text-[10rem] font-serif italic tracking-tighter text-white leading-[0.75] uppercase">
                    {title}
                </h1>
                <p className="font-serif text-3xl text-white/40 italic max-w-lg leading-tight tracking-tight">
                    {subtitle || "Optimized components for high-velocity digital curation."}
                </p>
            </div>
          </div>

          {/* RIGHT: ENGINE TELEMETRY */}
          <div className="lg:col-span-5 flex flex-col gap-10 border-l border-white/5 pl-12 py-8">
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Thrust_Efficiency</span>
                    <span className="text-xs font-mono text-orange-500">98.4%</span>
                </div>
                <div className="h-px w-full bg-white/10 relative">
                    <div className="absolute top-0 left-0 h-full bg-orange-500 w-[98%] shadow-[0_0_10px_#f97316]" />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="group border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
                    <Gauge size={18} className="text-white/20 mb-4 group-hover:text-orange-500 transition-colors" />
                    <span className="block text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">Compression</span>
                    <span className="text-lg font-mono text-white">12.4:1</span>
                </div>
                <div className="group border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
                    <Zap size={18} className="text-white/20 mb-4 group-hover:text-orange-500 transition-colors" />
                    <span className="block text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">Ignition_Seq</span>
                    <span className="text-lg font-mono text-white uppercase">Active</span>
                </div>
             </div>
             
             <div className="flex items-center gap-3 text-white/10">
                <div className="size-1 bg-white/20 rounded-full" />
                <span className="text-[8px] font-mono tracking-[0.8em] uppercase">End_Of_Telemetry</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
import React from 'react';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
}

const CategoryHero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="relative h-[65dvh] min-h-[600px] w-full bg-[#050505] overflow-hidden flex items-center border-b border-white/[0.04] pt-20">

      {/* --- SUBTLE BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">

          {/* ── LEFT: EDITORIAL TYPOGRAPHY ── */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif tracking-tight text-white leading-[0.85] capitalize">
                {title}
              </h1>
              <p className="font-sans text-sm md:text-base text-white/50 font-light max-w-md leading-relaxed">
                {subtitle || "A study in drape, weight, and silhouette. Engineered for longevity and effortless movement."}
              </p>
            </div>

            <div className="flex items-center gap-12 pt-8 border-t border-white/[0.06] max-w-md">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Season</span>
                <span className="text-xs text-white tracking-widest font-light">Core / 01</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Availability</span>
                <span className="text-xs text-white tracking-widest font-light">In Stock</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT: HIGH-END EDITORIAL ARTIFACT ── */}
          <div className="hidden lg:flex w-full lg:w-1/2 h-full justify-end items-center">

            <div className="relative w-[85%] max-w-[480px] aspect-[4/5] bg-[#0a0a0a] group">

              {/* Subtle ambient glow behind the image on hover */}
              <div className="absolute -inset-4 bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <div className="relative w-full h-full overflow-hidden border border-white/[0.04]">

                {/* The Primary Image */}
                <Image
                  src="/assets/images/img-4.png"
                  alt={`${title} editorial mood`}
                  fill
                  className="object-cover contrast-125 opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  priority
                />

                {/* Radial Vignette Overlay for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10 transition-opacity duration-[2s] group-hover:opacity-70" />

                {/* Studio Inner Frame */}
                <div className="absolute inset-4 md:inset-6 border border-white/[0.08] pointer-events-none z-20" />

                {/* Physical Film Grain Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-30"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Minimal Framing Typography */}
                <div className="absolute bottom-8 right-8 flex items-center gap-3 z-40 text-white/70 mix-blend-screen">
                  <span className="text-[9px] uppercase tracking-[0.2em]">Fig. 01</span>
                  <div className="size-1.5 bg-white/70 rounded-full" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
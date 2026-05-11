import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/container';

interface HeroProps {
  title: string;
  subtitle?: string;
}

const CategoryHero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden pt-32 pb-12">

      {/* --- SUBTLE BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
      </div>

      <Container>
        <div className="relative z-20 flex flex-col gap-16 lg:gap-24">

          {/* ── TOP: EDITORIAL TYPOGRAPHY GRID ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

            {/* LEFT: Large H1 Title (Reduced size) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif tracking-tight leading-[0.85] capitalize">
                {title}
              </h1>
            </div>

            {/* RIGHT: Paragraph & Meta (Aligned to baseline of H1) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-8 lg:pb-3">
              <p className="font-sans text-base md:text-lg text-white/60 font-light leading-relaxed max-w-md">
                {subtitle || "A study in drape, weight, and silhouette. Engineered for longevity and effortless movement."}
              </p>

              <div className="flex items-center gap-12 pt-8 border-t border-white/[0.1] max-w-md">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">Season</span>
                  <span className="text-xs tracking-widest font-light">Core / 01</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">Availability</span>
                  <span className="text-xs tracking-widest font-light">In Stock</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── BOTTOM: CINEMATIC RECTANGULAR ANCHOR IMAGE ── */}
          <div className="w-full relative aspect-[16/9] lg:aspect-[21/9] min-h-[250px] max-h-[500px] bg-[#0a0a0a] group overflow-hidden border border-white/[0.04]">

            {/* Subtle ambient glow behind the image on hover */}
            <div className="absolute -inset-4 bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="relative w-full h-full overflow-hidden">
              {/* The Primary Image: object-cover ensures it never stretches or distorts */}
              <Image
                src="/assets/images/img-4.png"
                alt={`${title} editorial mood`}
                fill
                className="object-cover object-center contrast-125 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                priority
              />

              {/* Vignette Overlay for depth */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10 transition-opacity duration-[2s] group-hover:opacity-40" />

              {/* Bottom Fade to blend with dark backgrounds if necessary */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505]/50 to-transparent pointer-events-none z-20" />

              {/* Physical Film Grain Texture Overlay */}
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none z-30"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
              />

              {/* Minimal Framing Typography */}
              <div className="absolute bottom-6 right-8 flex items-center gap-3 z-40 text-white/80 mix-blend-screen">
                <span className="text-[10px] uppercase tracking-[0.2em]">Fig. 01</span>
                <div className="size-1.5 bg-white/80 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CategoryHero;
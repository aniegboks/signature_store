import React from 'react';
import Link from 'next/link';
import Container from './ui/container';
import { RevealAnimation } from '@/utils/reveal_animation';
import { contactNav, nav, dataNav } from '@/utils';
import { MoveRight } from 'lucide-react';

const Footer = () => {
  // Silky smooth easing curve for premium interactions
  const smoothEase = "ease-[0.16,1,0.3,1]";

  return (
    <footer className="relative pt-48 bg-[#0a0a0a] text-white overflow-hidden border-t border-white/5 selection:bg-white selection:text-black font-sans">

      {/* --- SUBTLE TEXTURAL BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <Container>
        <RevealAnimation>
          <div className="relative z-10">

            {/* --- TOP SECTION: THE STATEMENT --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">
              <div className="space-y-10 max-w-3xl">
                <Link href="/" className="group inline-block">
                  <h2 className="text-6xl md:text-[110px] font-heading italic tracking-tighter text-white leading-[0.85]">
                    Signature<span className="text-neutral-600 not-italic">.</span>
                  </h2>
                </Link>
                <p className="font-heading text-3xl md:text-4xl leading-[1.1] text-neutral-500 tracking-tight italic max-w-2xl">
                  Curating the intersection of human form and textural permanence.
                </p>
              </div>

              {/* Physical Studio Anchor */}


            </div>

            {/* --- MAIN NAVIGATION: THE ARCHIVES --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 gap-y-20 mb-32 border-t border-white/5 pt-20">

              <div className="space-y-10">
                <h4 className="text-[9px] font-mono uppercase tracking-[0.4em] text-neutral-600">Company</h4>
                <ul className="space-y-5">
                  {nav.map(({ name, label }, index) => (
                    <li key={index}>
                      <Link href={label} className="text-[11px] text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium block group/link w-fit">
                        <span className={`inline-block transition-transform duration-700 ${smoothEase} group-hover/link:translate-x-2`}>
                          {name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <h4 className="text-[9px] font-mono uppercase tracking-[0.4em] text-neutral-600">Inventory</h4>
                <ul className="space-y-5">
                  {contactNav.map(({ name, label }, index) => (
                    <li key={index}>
                      <Link href={label} className="text-[11px] text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium block group/link w-fit">
                        <span className={`inline-block transition-transform duration-700 ${smoothEase} group-hover/link:translate-x-2`}>
                          {name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <h4 className="text-[9px] font-mono uppercase tracking-[0.4em] text-neutral-600">Legal</h4>
                <ul className="space-y-5">
                  {dataNav.map(({ name, label }, index) => (
                    <li key={index}>
                      <Link href={label} className="text-[11px] text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium block group/link w-fit">
                        <span className={`inline-block transition-transform duration-700 ${smoothEase} group-hover/link:translate-x-2`}>
                          {name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter / Interaction Call to Action */}
              <div className="col-span-2 space-y-10 mt-4 lg:mt-0 lg:pl-12 lg:border-l lg:border-white/5">
                <h4 className="text-[9px] font-mono uppercase tracking-[0.4em] text-neutral-600">The Dispatch</h4>

                <div className="relative group/input max-w-sm">
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-[11px] font-mono tracking-[0.2em] uppercase focus:outline-none focus:border-white transition-colors duration-500 placeholder:text-neutral-700 text-white"
                  />
                  <button className={`absolute right-0 bottom-4 text-neutral-600 transition-all duration-500 ${smoothEase} group-hover/input:text-white group-focus-within/input:text-white group-focus-within/input:translate-x-1`}>
                    <MoveRight size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <p className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] leading-relaxed">
                  Acquire early access to silhouette <br /> releases and studio archives.
                </p>
              </div>
            </div>

            {/* --- MASSIVE GHOST WATERMARK --- */}
            <div className="w-full flex justify-center items-center overflow-hidden pointer-events-none select-none border-t border-white/5 pt-12">
              <h1 className="text-[18vw] leading-[0.75] font-heading italic tracking-tighter text-white/[0.02] mix-blend-plus-lighter translate-y-[20%]">
                SIGNATURE
              </h1>
            </div>

            {/* --- FOOTER BASE: LEGAL & SOCIAL --- */}
            <div className="pb-8 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
              <div className="space-y-6">
                <div className="flex gap-8">
                  {['Instagram', 'LinkedIn', 'X', 'Threads'].map((social) => (
                    <Link key={social} href="#" className={`text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-all duration-500 ${smoothEase} hover:-translate-y-0.5 block`}>
                      {social}
                    </Link>
                  ))}
                </div>
                <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.4em]">
                  © {new Date().getFullYear()} Signature Studio. All Rights Reserved.
                </p>
              </div>

              <div className="text-right hidden md:flex flex-col gap-2">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-[0.4em]">
                  Designed by Signature
                </span>
                <span className="text-[10px] font-serif italic text-neutral-400">
                  Built for the forward-thinking collective.
                </span>
              </div>
            </div>

          </div>
        </RevealAnimation>
      </Container>
    </footer>
  );
};

export default Footer;
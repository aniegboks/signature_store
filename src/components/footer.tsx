import React from 'react';
import Link from 'next/link';
import Container from './ui/container';
import { RevealAnimation } from '@/utils/reveal_animation';
import { contactNav, nav, dataNav } from '@/utils';
import { MoveRight, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative pt-48 pb-20 bg-[#0A0A0A] text-white overflow-hidden border-t border-white/5 selection:bg-white selection:text-black">

      {/* --- SUBTLE TEXTURAL BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very faint grain or noise effect can go here, currently using clean space */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <Container>
        <RevealAnimation>
          <div className="relative z-10">

            {/* --- TOP SECTION: THE STATEMENT --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">
              <div className="space-y-10 max-w-2xl">
                <Link href="/" className="group inline-block">
                  <h2 className="text-6xl md:text-8xl font-heading italic tracking-tighter text-white leading-none">
                    Signature<span className="text-neutral-500 not-italic">.</span>
                  </h2>
                </Link>
                <p className="font-heading text-3xl md:text-4xl leading-[1.1] text-neutral-400 tracking-tight italic">
                  Curating the intersection of <span className="text-white">human form</span> and <span className="text-white">textural permanence.</span>
                </p>
              </div>

              {/* Quick Status / Location Node */}
              <div className="flex flex-col items-start lg:items-end gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="size-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-400">Available for Selection</span>
                </div>
              </div>
            </div>

            {/* --- MAIN NAVIGATION: THE ARCHIVES --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-40 border-t border-white/5 pt-20">

              <div className="space-y-8">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-600">Company</h4>
                <ul className="space-y-4">
                  {nav.map(({ name, label }, index) => (
                    <li key={index}>
                      <Link href={label} className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-600">Inventory</h4>
                <ul className="space-y-4">
                  {contactNav.map(({ name, label }, index) => (
                    <li key={index}>
                      <Link href={label} className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-600">Legal</h4>
                <ul className="space-y-4">
                  {dataNav.map(({ name, label }, index) => (
                    <li key={index}>
                      <Link href={label} className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter / Interaction Call to Action */}
              <div className="col-span-2 space-y-8 mt-12 lg:mt-0">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-600">The Newsletter</h4>
                <div className="relative group max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-heading italic focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700"
                  />
                  <button className="absolute right-0 bottom-4 text-neutral-500 group-hover:text-white transition-colors">
                    <MoveRight size={20} />
                  </button>
                </div>
                <p className="text-[9px] text-neutral-600 uppercase tracking-widest leading-loose">
                  Acquire early access to silhouette <br /> releases and studio archives.
                </p>
              </div>
            </div>

            {/* --- FOOTER BASE: LEGAL & SOCIAL --- */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-4">
                <div className="flex gap-8">
                  {['Instagram', 'LinkedIn', 'X', 'Threads'].map((social) => (
                    <Link key={social} href="#" className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-colors">
                      {social}
                    </Link>
                  ))}
                </div>
                <p className="text-[10px] font-medium text-neutral-700 uppercase tracking-[0.4em]">
                  © {new Date().getFullYear()} Signature Studio. All Rights Reserved.
                </p>
              </div>

              <div className="text-right hidden md:block">
                <span className="text-[9px] font-medium text-neutral-800 uppercase tracking-[0.6em] block mb-2">
                  Designed by Signature
                </span>
                <span className="text-[10px] font-heading text-neutral-500">
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
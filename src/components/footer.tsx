import React from 'react';
import Link from 'next/link';
import Container from './ui/container';
import Image from 'next/image';
import { RevealAnimation } from '@/utils/reveal_animation';
import { contactNav, nav, dataNav } from '@/utils';
import { Gauge, Cpu, Radio, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative pt-40 pb-12 bg-[#0A0A0A] text-white overflow-hidden border-t border-white/5">
      
      {/* --- ENGINE SCHEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <svg className="absolute bottom-[-10%] left-[-5%] w-[60%] opacity-20" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.1">
            <circle cx="50" cy="50" r="40" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="30" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
        </svg>
      </div>

      <Container>
        <RevealAnimation>
          <div className="relative z-10">
            
            {/* --- TOP HUD: SYSTEM STATUS --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 pb-12 border-b border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <Cpu size={12} />
                        <span className="text-[9px] font-mono tracking-[0.4em] uppercase">Core_System</span>
                    </div>
                    <p className="text-xs font-mono text-white/40">v3.0.4 // STABLE</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <Gauge size={12} />
                        <span className="text-[9px] font-mono tracking-[0.4em] uppercase">Thrust_Ratio</span>
                    </div>
                    <p className="text-xs font-mono text-white/40">98.2% NOMINAL</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <Radio size={12} />
                        <span className="text-[9px] font-mono tracking-[0.4em] uppercase">Uplink</span>
                    </div>
                    <p className="text-xs font-mono text-white/40">CONNECTED_LAGOS</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <ShieldCheck size={12} />
                        <span className="text-[9px] font-mono tracking-[0.4em] uppercase">Auth</span>
                    </div>
                    <p className="text-xs font-mono text-white/40">ENCRYPTED_AES</p>
                </div>
            </div>

            {/* --- MAIN NAVIGATION: THE MANIFEST --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
              
              {/* Brand Signal */}
              <div className="lg:col-span-5 space-y-12">
                <Link href="/" className="group inline-block">
                    <h2 className="text-5xl font-serif italic tracking-tighter text-white group-hover:text-orange-500 transition-colors duration-500">
                        Signature<span className="text-orange-500 not-italic text-lg">.exe</span>
                    </h2>
                </Link>
                <p className="font-serif text-3xl leading-tight text-white/60 tracking-tight max-w-sm italic">
                   Archiving the future of human <span className="text-white not-italic border-b border-orange-500">motion.</span>
                </p>
              </div>

              {/* Navigation Columns */}
              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-8">
                    <h4 className="text-[8px] font-mono uppercase tracking-[0.8em] text-white/20">Directory_01</h4>
                    <ul className="space-y-4">
                        {contactNav.map(({ name, label }, index) => (
                            <li key={index}>
                                <Link href={label} className="text-xs font-mono text-white/40 hover:text-orange-500 transition-all uppercase tracking-widest">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[8px] font-mono uppercase tracking-[0.8em] text-white/20">Archive_02</h4>
                    <ul className="space-y-4">
                        {nav.map(({ name, label }, index) => (
                            <li key={index}>
                                <Link href={label} className="text-xs font-mono text-white/40 hover:text-orange-500 transition-all uppercase tracking-widest">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[8px] font-mono uppercase tracking-[0.8em] text-white/20">Legal_03</h4>
                    <ul className="space-y-4">
                        {dataNav.map(({ name, label }, index) => (
                            <li key={index}>
                                <Link href={label} className="text-xs font-mono text-white/40 hover:text-orange-500 transition-all uppercase tracking-widest">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>

            {/* --- FOOTER BASE: DATA STREAM --- */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase">Terminal_Output</span>
                <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <span>© {new Date().getFullYear()} Signature_Inc</span>
                    <div className="size-1 bg-orange-500 rounded-full" />
                    <span>Lagos_NG</span>
                </div>
              </div>

              {/* Technical Social Nodes */}
              <div className="flex gap-4">
                {['x', 'instagram', 'linkedin', 'threads'].map((id) => (
                  <Link key={id} href="#" className="size-10 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group">
                    <Image
                      src={`/assets/icons/${id}.svg`}
                      alt={id}
                      height={12}
                      width={12}
                      className="invert opacity-30 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-end gap-1">
                 <span className="text-[8px] font-mono text-orange-500 tracking-[0.4em] animate-pulse">● LIVE_FEED</span>
                 <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">End_Of_Transmission</span>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </footer>
  );
};

export default Footer;
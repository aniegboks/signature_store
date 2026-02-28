"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import Container from './ui/container';
import Image from 'next/image';
import { ALL_FAQ_QUERYResult } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import gsap from 'gsap';
import { Terminal, Plus, Minus, Settings2 } from 'lucide-react';

type FaqProps = {
    allFaq: ALL_FAQ_QUERYResult;
};

const Faq = ({ allFaq }: FaqProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animation
            gsap.from(".faq-reveal", {
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power3.out",
            });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                // Calculations rounded to prevent sub-pixel blur
                const xPos = Math.round((clientX / window.innerWidth - 0.5) * 20);
                const yPos = Math.round((clientY / window.innerHeight - 0.5) * 20);

                gsap.to(imageRef.current, {
                    x: xPos,
                    y: yPos,
                    duration: 1.5,
                    ease: "power2.out",
                    // THE BLUR FIX: ensures rendering is sharp
                    force3D: false, 
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={rootRef} className="relative w-full py-24 md:py-40 bg-[#fbfbfb] overflow-hidden">
            
            {/* TECHNICAL BLUEPRINT GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-black/[0.03]" />

            <Container>
                {/* HUD Header: Technical Engine Specs Style */}
                <div className="mb-32 relative">
                    <div className="absolute top-0 left-0 flex flex-col gap-1 opacity-20 hidden md:flex">
                        <span className="text-[7px] font-mono tracking-tighter">ENGINE_TYPE: V12_BITURBO</span>
                        <span className="text-[7px] font-mono tracking-tighter">SERIAL: 0092-2026-X</span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="faq-reveal flex items-center gap-3 mb-6 bg-black text-white px-3 py-1">
                            <Settings2 size={10} className="text-orange-500 animate-spin-slow" />
                            <span className="text-[9px] uppercase tracking-[0.4em] font-mono font-bold">
                                Manual_Specifications
                            </span>
                        </div>
                        <h2 className="faq-reveal text-6xl md:text-8xl font-serif tracking-tighter text-neutral-900 leading-[0.85]">
                            Technical <span className="italic font-light text-orange-500">Manual</span>
                        </h2>
                    </div>
                </div>

                <div className="relative flex flex-col lg:flex-row items-start justify-between gap-12 xl:gap-24">
                    
                    {/* Sticky Image: Mechanical Diagram Style */}
                    <div className="sticky top-32 hidden lg:block order-2 lg:order-1">
                        <div 
                            ref={imageRef}
                            className="faq-reveal relative w-[420px] h-[560px] bg-neutral-200 shadow-2xl overflow-visible"
                        >
                            {/* Technical Corner Notches */}
                            <div className="absolute -top-4 -left-4 font-mono text-[10px] text-orange-500 font-bold">01_DIAGRAM</div>
                            
                            <div className="relative w-full h-full grayscale overflow-hidden border-[12px] border-white shadow-inner">
                                {allFaq?.[0]?.image && (
                                    <Image
                                        src={imageUrl(allFaq[0].image).url()}
                                        alt="Engine Components"
                                        fill
                                        className="object-cover transition-transform duration-[3s] ease-out hover:scale-110"
                                        priority
                                    />
                                )}
                                {/* Scanline HUD Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
                            </div>

                            {/* Telemetry Data Points */}
                            <div className="absolute top-1/4 -right-8 flex flex-col gap-4">
                                {[1, 2, 3].map((n) => (
                                    <div key={n} className="flex items-center gap-2">
                                        <div className="size-1.5 bg-orange-500 rotate-45" />
                                        <div className="h-px w-8 bg-black/10" />
                                        <span className="text-[8px] font-mono opacity-40">PT_{n}00</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Accordion List: Machine-Parts Style */}
                    <div className="w-full lg:max-w-3xl order-1 lg:order-2">
                        <div className="border-t border-black/10">
                            {allFaq?.[0]?.items?.map((item, i) => {
                                const isOpen = openIndex === i;

                                return (
                                    <div 
                                        key={item._key} 
                                        className={`faq-reveal border-b border-black/5 transition-colors duration-500 ${isOpen ? 'bg-white' : 'hover:bg-neutral-100/50'}`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="w-full px-4 md:px-8 py-12 text-left flex items-start justify-between group"
                                        >
                                            <div className="flex gap-8 md:gap-12 items-start">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className={`text-[10px] font-mono font-bold transition-colors ${isOpen ? 'text-orange-500' : 'text-neutral-300'}`}>
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    <div className={`w-px h-8 transition-all duration-500 ${isOpen ? 'bg-orange-500 h-12' : 'bg-neutral-200'}`} />
                                                </div>

                                                <div className="space-y-6">
                                                    <h3 className={`text-2xl md:text-3xl tracking-tighter font-serif transition-all duration-500 ${isOpen ? 'text-black' : 'text-neutral-400'}`}>
                                                        {item.question}
                                                    </h3>

                                                    <div 
                                                        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                                                            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                    >
                                                        <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-xl pb-4">
                                                            {item.answer}
                                                        </p>
                                                        {/* Metadata for answer */}
                                                        <div className="flex gap-4 pt-4 border-t border-black/[0.03]">
                                                            <span className="text-[8px] font-mono uppercase tracking-widest text-orange-500/50">Verified_Data</span>
                                                            <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-300">Auth_ID: 992-0</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`transition-transform duration-500 p-2 border ${isOpen ? 'border-orange-500 text-orange-500 rotate-180' : 'border-black/5 text-neutral-300 group-hover:border-black/20'}`}>
                                                {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* End of File HUD */}
                        <div className="faq-reveal mt-20 p-8 border border-dashed border-black/10 flex justify-between items-center bg-neutral-50/50">
                            <div className="flex items-center gap-4">
                                <Terminal size={14} className="opacity-20" />
                                <div className="space-y-1">
                                    <p className="text-[9px] font-mono leading-none tracking-[0.2em] uppercase">Status: Document_Finalized</p>
                                    <p className="text-[7px] font-mono text-neutral-400 uppercase">Checksum: 8829100X-SIG</p>
                                </div>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-[7px] font-mono text-neutral-300 uppercase leading-relaxed">Archive Signature Series<br/>All Rights Reserved // 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Faq;
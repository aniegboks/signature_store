'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Container from './ui/container';
import Image from 'next/image';
import { ALL_FAQ_QUERYResult } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import gsap from 'gsap';
import { Plus, Minus } from 'lucide-react';

type FaqProps = {
    allFaq: ALL_FAQ_QUERYResult;
};

const Faq = ({ allFaq }: FaqProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Elegant, staggered reveal
            gsap.from(".faq-reveal", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Heavy, luxurious photo parallax (replacing the loose sketch effect)
            if (imageRef.current) {
                const xTo = gsap.quickTo(imageRef.current, "x", { duration: 1.5, ease: "power3.out" });
                const yTo = gsap.quickTo(imageRef.current, "y", { duration: 1.5, ease: "power3.out" });

                const handleMouseMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const xNorm = (clientX / window.innerWidth - 0.5);
                    const yNorm = (clientY / window.innerHeight - 0.5);

                    // Subtle, heavy movement (max 15px shift)
                    xTo(xNorm * 15);
                    yTo(yNorm * 15);
                };

                window.addEventListener("mousemove", handleMouseMove);
                return () => window.removeEventListener("mousemove", handleMouseMove);
            }
        }, rootRef);

        return () => ctx.revert();
    }, []);

    if (!allFaq || allFaq.length === 0) return null;

    return (
        <section ref={rootRef} className="relative w-full py-32 md:py-40 bg-[#FAFAFA] text-neutral-900 overflow-hidden">
            <Container>
                <div className="relative flex flex-col lg:flex-row items-start justify-between gap-16 xl:gap-24">

                    {/* LEFT COLUMN: Editorial Header & Accordion */}
                    <div className="w-full lg:max-w-2xl order-2 lg:order-1 z-20">

                        <div className="faq-reveal mb-20 relative space-y-6">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block">
                                Client Protocol
                            </span>
                            <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-neutral-900 leading-none">
                                Garment <span className="italic font-light text-neutral-400">Care.</span>
                            </h2>
                        </div>

                        <div className="border-t border-black/[0.06]">
                            {allFaq?.[0]?.items?.map((item, i) => {
                                const isOpen = openIndex === i;

                                return (
                                    <div
                                        key={item._key}
                                        className={`faq-reveal border-b border-black/[0.06] transition-colors duration-700 ${isOpen ? 'bg-white' : 'hover:bg-white/50'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="w-full px-4 md:px-8 py-10 text-left flex items-start justify-between group"
                                        >
                                            <div className="flex gap-8 items-start">
                                                {/* Minimalist Index */}
                                                <span className={`text-xs mt-1 transition-colors duration-500 ${isOpen ? 'text-neutral-900' : 'text-neutral-300'
                                                    }`}>
                                                    0{i + 1}
                                                </span>

                                                <div className="space-y-4 flex-1">
                                                    <h3 className={`text-xl font-serif transition-colors duration-500 leading-snug ${isOpen ? 'text-neutral-900 italic' : 'text-neutral-600 group-hover:text-neutral-900'
                                                        }`}>
                                                        {item.question}
                                                    </h3>

                                                    <div
                                                        className={`overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
                                                            }`}
                                                    >
                                                        <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-md pb-2">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Clean, unboxed icon */}
                                            <div className={`mt-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'text-neutral-900 rotate-180' : 'text-neutral-300 group-hover:text-neutral-600'
                                                }`}>
                                                {isOpen ? <Minus size={16} strokeWidth={1} /> : <Plus size={16} strokeWidth={1} />}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Heavy Editorial Photograph */}
                    <div className="sticky top-40 hidden lg:block order-1 lg:order-2 z-10">
                        <div
                            ref={imageRef}
                            className="faq-reveal relative w-[420px] aspect-[3/4] bg-neutral-100 overflow-hidden will-change-transform"
                        >
                            {allFaq?.[0]?.image && (
                                <Image
                                    src={imageUrl(allFaq[0].image).url()}
                                    alt="Garment details"
                                    fill
                                    className="object-cover transition-transform duration-[6s] ease-out hover:scale-105 grayscale hover:grayscale-0"
                                    priority
                                />
                            )}
                            {/* Subtle overlay to soften the image contrast natively */}
                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                            {/* Minimal structural detail replacing the tape */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="h-px w-6 bg-white/60" />
                                <span className="font-sans text-[9px] uppercase tracking-widest text-white/80 mix-blend-difference">
                                    Archive_Ref
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default Faq;
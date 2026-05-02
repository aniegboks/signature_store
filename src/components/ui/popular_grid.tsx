'use client';

import React, { useRef } from 'react';
import Container from './container';
import { ALL_POPULAR_PRODUCTS_QUERYResult } from '../../../sanity.types';
import PopularProducts from './popular_products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

type PopularGridProps = {
    popularProducts: ALL_POPULAR_PRODUCTS_QUERYResult;
};

const PopularGrid: React.FC<PopularGridProps> = ({ popularProducts }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Elegant, fluid scroll 
    const animateScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            // Scroll by roughly two items for a smooth, editorial paging feel
            const scrollAmount = direction === 'left' ? `-=${width * 0.5}` : `+=${width * 0.5}`;

            gsap.to(scrollRef.current, {
                scrollTo: { x: scrollAmount },
                duration: 1.2,
                ease: "power3.inOut",
                overwrite: true
            });
        }
    };

    if (!popularProducts || popularProducts.length === 0) return null;

    return (
        <section className="bg-[#FAFAFA] py-32 md:py-40 overflow-hidden relative border-t border-black/[0.06]">

            <Container>
                {/* --- EDITORIAL HEADER & CONTROLS --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 relative z-10 gap-8">

                    <div className="max-w-2xl space-y-6">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block">
                            Curated Index
                        </span>
                        <h3 className="font-serif font-light text-5xl md:text-7xl text-neutral-900 tracking-tight leading-none">
                            Signature <span className="italic text-neutral-400">Silhouettes.</span>
                        </h3>
                    </div>

                    {/* Minimalist Navigation */}
                    <div className="flex flex-col items-end gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => animateScroll('left')}
                                aria-label="Scroll left"
                                className="group h-12 w-16 border border-black/[0.08] flex items-center justify-center hover:bg-neutral-900 transition-colors duration-500"
                            >
                                <ChevronLeft size={18} strokeWidth={1} className="text-neutral-500 group-hover:text-white transition-colors duration-500" />
                            </button>
                            <button
                                onClick={() => animateScroll('right')}
                                aria-label="Scroll right"
                                className="group h-12 w-16 border border-black/[0.08] flex items-center justify-center hover:bg-neutral-900 transition-colors duration-500"
                            >
                                <ChevronRight size={18} strokeWidth={1} className="text-neutral-500 group-hover:text-white transition-colors duration-500" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* --- THE GALLERY CAROUSEL --- */}
                <div className="relative">
                    {/* Subtle fade masks for the edges */}
                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-12 cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {popularProducts?.map((popularProduct) => (
                            <div
                                key={popularProduct._id}
                                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[23.5%] flex-shrink-0 group"
                            >
                                <PopularProducts popularProduct={popularProduct as ALL_POPULAR_PRODUCTS_QUERYResult[number]} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PopularGrid;
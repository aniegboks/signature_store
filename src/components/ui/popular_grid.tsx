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
    const turbineRef = useRef<SVGSVGElement>(null);

    // GSAP Fluid Scroll - Adjusted scroll amount for 4-column density
    const animateScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            // Scrolling by 25% (one item) or 50% for a snappier feel
            const scrollAmount = direction === 'left' ? `-=${width * 0.5}` : `+=${width * 0.5}`;
            
            gsap.to(scrollRef.current, {
                scrollTo: { x: scrollAmount },
                duration: 1.2,
                ease: "power4.out",
                overwrite: true
            });

            gsap.to(turbineRef.current, {
                rotate: direction === 'left' ? "-=90" : "+=90",
                duration: 1,
                ease: "expo.out"
            });
        }
    };

    return (
        <section className="bg-[#fcfcfc] py-40 overflow-hidden relative">
            {/* --- JET ENGINE BACKGROUND ELEMENT --- */}
            <div className="absolute top-20 right-[-10%] opacity-[0.03] pointer-events-none">
                <svg ref={turbineRef} width="600" height="600" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="98" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
                    {[...Array(24)].map((_, i) => (
                        <path 
                            key={i} 
                            d="M100 100 L100 10 Q110 10 115 100 Z" 
                            fill="black" 
                            style={{ transform: `rotate(${i * 15}deg)`, transformOrigin: 'center' }} 
                        />
                    ))}
                </svg>
            </div>

            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 relative z-10">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-12 bg-orange-500" />
                            <span className="text-[10px] uppercase tracking-[0.8em] text-black/30 font-mono">
                                Turbine_Flow_v.01
                            </span>
                        </div>
                        <h3 className="font-serif font-light text-7xl md:text-9xl text-black tracking-tighter leading-none">
                            The <span className="italic">Pinnacle</span> <br /> 
                            <span className="text-orange-500/90 ml-12">Collection.</span>
                        </h3>
                    </div>
                    
                    <div className="flex flex-col items-end gap-6">
                        <div className="text-[9px] font-mono text-black/20 tracking-widest uppercase mb-2">
                            Manual_Override // Scroll_Control
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => animateScroll('left')}
                                className="group size-16 border border-black/5 flex items-center justify-center hover:bg-black transition-all duration-500"
                            >
                                <ChevronLeft size={20} strokeWidth={1} className="group-hover:text-white transition-colors" />
                            </button>
                            <button 
                                onClick={() => animateScroll('right')}
                                className="group size-16 border border-black/5 flex items-center justify-center hover:bg-black transition-all duration-500"
                            >
                                <ChevronRight size={20} strokeWidth={1} className="group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- ADJUSTED CAROUSEL --- */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-20 cursor-grab active:cursor-grabbing"
                >
                    {popularProducts?.map((popularProduct) => (
                        <div
                            key={popularProduct._id}
                            /* min-w-[22%] allows for roughly 4 items + gaps. 
                                We use 23% or 24% to ensure the 4th item is slightly cut off 
                                or perfectly fit depending on your exact padding preference.
                            */
                            className="min-w-[80%] sm:min-w-[45%] lg:min-w-[23.5%] flex-shrink-0"
                        >
                            <PopularProducts popularProduct={popularProduct as ALL_POPULAR_PRODUCTS_QUERYResult[number]} />
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-between items-center py-8 border-t border-black/5">
                    <div className="flex gap-2 items-center">
                        <div className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[9px] font-mono tracking-tighter">00:44_ENGINE_STABLE</span>
                    </div>
                    <div className="text-[8px] font-mono text-black/20 uppercase tracking-[0.5em]">
                        Supersonic_Aesthetic_Systems
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PopularGrid;
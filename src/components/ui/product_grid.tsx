"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Container from './container';
import ProductThumbnail from './product_thumbnail';
import { Product } from '../../../sanity.types';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProductGrid = ({ products, slug }: { products: Product[], slug: string }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".grid-item", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                }
            });
        }, gridRef);
        return () => ctx.revert();
    }, []);

    return (
        /* Using the Light Background to match product images */
        <section className="bg-transparent py-24 md:py-32 min-h-screen">
            <Container>
                {/* --- TECHNICAL HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-12 border-b border-black/5">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            {/* PEACH ON BLACK TAG */}
                            <span className="bg-black text-[#f97316] px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.3em]">
                                CAT_LOG_01
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-black/20 font-mono">Archive // Selection</span>
                        </div>
                        <h1 ref={titleRef} className="text-6xl md:text-8xl font-serif italic tracking-tighter text-black">
                            {slug.replace('_', ' ')}<span className="text-orange-500">_</span>
                        </h1>
                    </div>
                    
                    <div className="mt-8 md:mt-0 flex gap-12 items-center">
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-black/20 mb-2">Grid_Status</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-4 h-[2px] bg-black/10 group hover:bg-orange-500 transition-colors" />
                                ))}
                            </div>
                        </div>
                        <div className="bg-black p-4 text-center min-w-[120px]">
                             <p className="text-[10px] font-mono text-[#f97316] uppercase tracking-tighter">Units_Available</p>
                             <p className="text-xl font-mono text-white leading-none mt-1">{products?.length}</p>
                        </div>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                {/* Increased gap-y to give the "Blueprint" look more breathing room */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
                    {products?.map((product, index) => (
                        <div key={product._id} className="grid-item group">
                            <ProductThumbnail product={product} index={index} />
                            
                            {/* Technical Label for the grid item */}
                            <div className="mt-4 flex justify-between items-start opacity-40 group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] font-mono uppercase text-black">Component_{index + 1}</span>
                                <span className="text-[8px] font-mono text-black/40">[{product._id.slice(0,6)}]</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ProductGrid;
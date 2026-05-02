'use client';
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
            // Elegant, floating reveal
            gsap.from(".grid-item", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                }
            });
        }, gridRef);
        return () => ctx.revert();
    }, []);

    // Format the slug for a graceful editorial title
    const formattedTitle = slug.replace(/_|-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <section className="bg-transparent py-24 md:py-32 min-h-screen">
            <Container>
                {/* --- EDITORIAL HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-12 border-b border-black/[0.04]">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans">
                                The Archive
                            </span>
                            <div className="w-6 h-px bg-neutral-300" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans">
                                Curated Selection
                            </span>
                        </div>
                        <h1 ref={titleRef} className="text-5xl md:text-7xl font-serif tracking-tight text-neutral-900">
                            {formattedTitle}.
                        </h1>
                    </div>

                    <div className="mt-12 md:mt-0 flex gap-12 items-center">
                        <div className="text-left md:text-right">
                            <p className="text-[10px] font-sans text-neutral-400 uppercase tracking-[0.2em] mb-2">
                                Available Pieces
                            </p>
                            <p className="text-xl font-serif text-neutral-900 leading-none">
                                {String(products?.length).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
                    {products?.map((product, index) => (
                        <div key={product._id} className="grid-item group">
                            <ProductThumbnail product={product} index={index} />

                            {/* Lookbook Labeling */}
                            <div className="mt-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-sans">
                                    Look 0{index + 1}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-300 font-sans">
                                    Ref—{product._id.slice(0, 4)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ProductGrid;
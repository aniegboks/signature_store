'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_CATEGORIES_QUERYResult } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Container from './container';

gsap.registerPlugin(ScrollTrigger);

type CategoriesProps = {
  featuredCategories: FEATURED_CATEGORIES_QUERYResult;
};

const Categories = ({ featuredCategories }: CategoriesProps) => {
  const componentRoot = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant, smooth reveal for each category row
      gsap.utils.toArray<HTMLDivElement>('.category-row').forEach((row) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          }
        });
      });
    }, componentRoot);

    return () => ctx.revert();
  }, []);

  if (!featuredCategories || featuredCategories.length === 0) return null;

  return (
    <section ref={componentRoot} className="w-full py-32 bg-[#FAFAFA] relative overflow-hidden">
      <Container>

        {/* --- EDITORIAL HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-neutral-900 leading-tight">
            Curated <br />
            <span className="italic text-neutral-400">Collections.</span>
          </h3>
          <p className="text-sm text-neutral-500 max-w-xs font-light leading-relaxed pb-2">
            Explore our meticulously selected categories, designed for the modern aesthetic and crafted with intentionality.
          </p>
        </div>

        {/* --- MINIMALIST CATALOG LIST --- */}
        <div className="border-t border-black/[0.06]">
          {featuredCategories.map((category, index) => {
            const img = category.image?.asset ? imageUrl(category.image).url() : null;

            return (
              <div key={category._id} className="category-row group relative border-b border-black/[0.06]">
                <Link href={`/category/${category.slug?.current}`} className="block">
                  <div className="flex items-center justify-between py-12 md:py-16 px-4 transition-colors duration-500 hover:bg-white">

                    {/* Left: Index & Title */}
                    <div className="flex items-baseline gap-8 md:gap-16 z-10">
                      <span className="text-xs tracking-[0.2em] text-neutral-400">
                        0{index + 1}
                      </span>
                      <h4 className="text-4xl md:text-6xl font-serif text-neutral-900 tracking-tight group-hover:italic group-hover:translate-x-4 transition-all duration-700 ease-out">
                        {category.title}
                      </h4>
                    </div>

                    {/* Right: Persistent Image */}
                    <div className="relative w-[35%] md:w-[25%] aspect-square overflow-hidden bg-neutral-100 z-10">
                      {img && (
                        <Image
                          src={img}
                          alt={category.title || 'Category image'}
                          fill
                          sizes="(max-width: 768px) 35vw, 25vw"
                          className="object-cover object-top group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                        />
                      )}
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default Categories;
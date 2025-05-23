'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURED_CATEGORIES_QUERYResult } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Container from './container';
import CategoriesTypeAnimation from './catigories_type_animation';
import { RevealAnimation } from '@/utils/reveal_animation';

type CategoriesProps = {
  featuredCategories: FEATURED_CATEGORIES_QUERYResult;
};

const Categories = ({ featuredCategories }: CategoriesProps) => {
  // Track which item is hovered (optional, but can be per-item)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full my-48">
      <RevealAnimation>
        <Container>
          <div className="flex justify-center mb-8">
            <h3 className="text-xl md:text-3xl font-bold">Explore Categories</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {featuredCategories.map((category, index) => {
              const img = category.image?.asset ? imageUrl(category.image).url() : null;

              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={category._id}
                  href={`/category/${category.slug?.current}`}
                  className="block w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative overflow-hidden w-full transition-shadow duration-300 rounded-md ">
                    {img && (
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.05, 1] }} transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-full h-[500px] relative rounded-md"
                      >
                        <Image
                          src={img}
                          alt={category.title || 'featured category'}
                          fill
                          className="object-cover rounded-md"
                        />
                      </motion.div>
                    )}

                    {/* Dark gradient on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-b-md"
                        />
                      )}
                    </AnimatePresence>

                    {/* Category title on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <div
                          className="absolute bottom-4 left-4 z-20"
                        >
                          <CategoriesTypeAnimation category={category} isHovered={isHovered} />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </RevealAnimation>
    </div>
  );
};

export default Categories;

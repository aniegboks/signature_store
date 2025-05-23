'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../../sanity.types';

const letterDelay = 0.025;
const fadeDuration = 0.125;

type CategoryTypeAnimationProps = {
  category: Category;
  isHovered: boolean;
};

const CategoriesTypeAnimation = ({ category, isHovered }: CategoryTypeAnimationProps) => {
  const word: string = category.title || '';

  return (
    <span aria-label={word} role="text" className="inline-block overflow-hidden whitespace-nowrap">
      {word.split('').map((letter, i) => (
        <motion.span key={i} className="relative inline-block">
          {/* Fade-in Letter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * letterDelay, duration: 0.2 }}
            className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent font-bold"
          >
            {letter}
          </motion.span>

          {/* Optional Flash Highlight */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{
              times: [0, 0.3, 1],
              delay: i * letterDelay,
              duration: fadeDuration,
              ease: 'easeInOut',
            }}
            className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-gradient-to-r from-white to-white pointer-events-none"
          />
        </motion.span>
      ))}
    </span>
  );
};

export default CategoriesTypeAnimation;

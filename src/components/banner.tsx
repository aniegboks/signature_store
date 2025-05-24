'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banner } from '../../sanity.types';
import Container from './ui/container';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import { RevealAnimation } from '@/utils/reveal_animation';

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 1.1,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.8, ease: 'easeInOut' },
  }),
};

const BannerSection = ({ banner }: { banner: Banner[] }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCarouselIndex((prev) =>
        banner[0]?.images ? (prev + 1) % banner[0].images.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [banner]);

  const handleDotClick = (index: number) => {
    setDirection(index > carouselIndex ? 1 : -1);
    setCarouselIndex(index);
  };

  return (
    <div>
      <Container>
        {banner?.map((bannerData) => {
          if (!bannerData.images || !bannerData.cardImages?.asset) return null;

          const imgUrl = imageUrl(bannerData.images[carouselIndex]).url();
          const cardImageUrl = imageUrl(bannerData.cardImages).url();

          return (
            <div key={bannerData._id}>
              {/* Text Section */}
              <RevealAnimation>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 pt-48 pb-16">
                  <div className="text-4xl md:text-5xl font-heading leading-tight tracking-tight">
                    <h1 className="text-5xl font-bold leading-tight tracking-tight">
                      {bannerData.name}
                    </h1>
                  </div>
                  {bannerData.description && (
                    <div className="text-start 2xl:text-right">
                      <p className="text-sm mt-4 text-neutral-700 font-heading break-words whitespace-pre-line">
                        {bannerData.description}
                      </p>
                    </div>
                  )}
                </div>
              </RevealAnimation>


              {/* Image Section */}
              <RevealAnimation>
                <div className="relative mt-2 w-full">
                  <div className="w-full aspect-video relative overflow-hidden rounded-md">
                    {/* Swipe Animated Image */}
                    <AnimatePresence custom={direction} mode="wait">
                      <motion.div
                        key={imgUrl}
                        custom={direction}
                        variants={swipeVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 z-0"
                      >
                        <Image
                          src={imgUrl}
                          alt={bannerData.name || 'Hero image'}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />

                    {/* Card Overlay */}
                    <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md text-black p-4 shadow-lg max-w-[220px] w-auto hidden xl:flex flex-col items-start z-20 rounded-md">
                      <div className="w-full mb-2">
                        <Image
                          src={cardImageUrl}
                          alt={bannerData.name || 'Card image'}
                          width={160}
                          height={160}
                          className="object-cover rounded-md"
                        />
                      </div>
                      <h3 className="text-base font-bold truncate mt-2 text-orange-400">
                        Signature
                      </h3>
                      <p className="text-sm mt-1 truncate">Signature Exchange</p>
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {bannerData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === carouselIndex ? 'bg-orange-500' : 'bg-neutral-300'
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </RevealAnimation>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default BannerSection;

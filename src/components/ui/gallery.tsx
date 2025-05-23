'use client';

import React from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { useGallery } from '../gallery_context';
import { AnimatePresence, motion } from 'framer-motion';

interface GalleryProps {
  images: any[];
  productName: string;
  isOutOfStock: boolean;
}

const Gallery = ({ images, productName, isOutOfStock }: GalleryProps) => {
  const { mainImageIndex } = useGallery();

  return (
    <div className="grid grid-cols-1 w-full h-full space-y-4 lg:space-y-8">
      <div className="w-full aspect-square overflow-hidden rounded-md relative">
        <AnimatePresence mode="wait">
          {images.length > 0 && (
            <motion.div
              key={mainImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image
                src={imageUrl(images[mainImageIndex]).url()}
                alt={productName || 'product image'}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold z-10">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

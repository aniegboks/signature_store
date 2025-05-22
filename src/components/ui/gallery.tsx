'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import Test from './test';
import { useGallery } from '../gallery_context';

interface GalleryProps {
    images: any[];
    productName: string;
    isOutOfStock: boolean;
}

const Gallery = ({ images, productName, isOutOfStock }: GalleryProps) => {
    const {mainImageIndex} = useGallery();

    return (
        <div className="grid grid-cols-1 w-full h-full space-y-4 lg:space-y-8">
            <div className="w-full aspect-square overflow-hidden rounded-md">
                {images.length > 0 && (
                    <Image
                        src={imageUrl(images[mainImageIndex]).url()}
                        alt={productName || 'product image'}
                        fill
                        className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                )}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-red-600 font-bold z-10">
                        Out of Stock
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;

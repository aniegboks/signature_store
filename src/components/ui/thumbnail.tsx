"use client"
import React from 'react';
import { useState } from 'react';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import { useGallery } from '../gallery_context';


interface GalleryProps {
    images: any[];
}

const Thumbnail = ({ images }: GalleryProps) => {
    //const [mainImageIndex, setMainImageIndex] = useState(0);
    const {mainImageIndex, setMainImageIndex} = useGallery();
    return (
        <div className="flex gap-2 overflow-hidden w-full justify-start px-1 h-full mt-4">
            {images.map((img, i) => (
                <div
                    key={img._key}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${i === mainImageIndex ? 'border-neutral-400' : 'border-transparent'
                        } cursor-pointer shrink-0`}
                    onClick={() => setMainImageIndex(i)}
                >
                    <Image
                        src={imageUrl(img).url()}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    )
}
export default Thumbnail;




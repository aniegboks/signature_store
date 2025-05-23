import React from 'react';
import Avatar from './avatar';
import Image from 'next/image';

const Collections = () => {
    return (
        <div className='aspect-video flex items-center justify-center'>
            {/* Ensure that Avatar has a set width/height */}
            <Avatar className='z-30 w-24 h-24 relative border-4 border-white'>
                <Image
                    fill
                    src='/assets/about/img1.jpg'
                    alt='Profile picture 1'
                    className='rounded-full object-cover'
                />
            </Avatar>
            <Avatar className='-ml-6 border-white z-20 w-24 h-24 relative'>
                <Image
                    fill
                    src='/assets/about/img2.jpg'
                    alt='Profile picture 2'
                    className='rounded-full object-cover'
                />
            </Avatar>
            <Avatar className='-ml-6 border-white z-10 w-24 h-24 relative'>
                <Image
                    fill
                    src='/assets/about/img3.jpg'
                    alt='Profile picture 3'
                    className='rounded-full object-cover'
                />
            </Avatar>
            <Avatar className='-ml-6 border-white w-24 h-24 relative'>
                <div className='w-full h-full bg-neutral-700 rounded-full inline-flex items-center justify-center gap-1 relative'>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <span
                            key={i}
                            className='w-2 h-2 rounded-full bg-white inline-flex'
                        ></span>
                    ))}
                </div>
            </Avatar>
        </div>
    );
};

export default Collections;

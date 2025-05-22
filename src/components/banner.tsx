import React from 'react';
import { Banner } from '../../sanity.types';
import Container from './ui/container';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import Link from 'next/link';

const BannerSection = ({ banner }: { banner: Banner[] }) => {
  return (
    <div className="pb-16 mt-24">
      <Container>
        <div className="space-y-24">
          {banner?.map((bannerData) => {
            if (!bannerData.images?.asset || !bannerData.cardImages?.asset) return null;

            const imgUrl = imageUrl(bannerData.images).url();
            const cardImageUrl = imageUrl(bannerData.cardImages).url();

            return (
              <div
                key={bannerData._id}
                className="grid grid-cols-1 lg:grid-cols-2 items-center"
              >
                {/* Text Section */}
                <div className="space-y-6 w-full px-6 py-10 flex flex-col items-center justify-center bg-neutral-100 text-black h-full rounded-s-md">
                  <div className="p-8 text-center md:text-left">
                    <h1 className="text-5xl md:text-5xl font-bold leading-tight tracking-tight">
                      {bannerData.name}
                    </h1>

                    {bannerData.description && (
                      <p className="text-sm text-neutral-800 mt-8 max-w-2xl mx-auto md:mx-0">
                        {bannerData.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full h-[500px] md:h-[700px] relative overflow-hidden rounded-e-md">
                  {/* Background Image */}
                  <Image
                    src={imgUrl}
                    alt={bannerData.name || 'Hero image'}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Overlay to dim brightness */}
                  <div className="absolute inset-0 bg-black/20 z-10" />

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
                    <h3 className="text-base font-bold truncate mt-2 text-orange-400">Signature</h3>
                    <p className="text-sm mt-1 truncate">Signature Exchange</p>
                  </div> 
            

                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default BannerSection;

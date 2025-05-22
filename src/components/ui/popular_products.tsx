import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';

const PopularProducts = ({ popularProduct }: { popularProduct: Product }) => {
  const isOutOfStock = (popularProduct.stock || 0) <= 0;

  return (
    <div className="transition overflow-hidden bg-white dark:bg-gray-900 rounded-md">
      <Link href={`/popularProduct/${popularProduct.slug?.current}`} className="block group relative">
        {/* Product Image */}
        {popularProduct.images && popularProduct.images[0] && (
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={imageUrl(popularProduct.images[0]).url()}
              alt={popularProduct.name || 'Popular Product'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-center align-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
            {popularProduct.name}
          </h2>
          <p className="text-sm text-gray-900 dark:text-gray-300 mt-1">
            $ {popularProduct.price?.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PopularProducts;

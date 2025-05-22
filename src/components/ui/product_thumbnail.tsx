import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';

const ProductThumbnail = ({ product }: { product: Product }) => {
    const isOutOfStock = (product.stock || 0) <= 0;

    return (
        <div className="transition overflow-hidden bg-white dark:bg-gray-900 rounded-md">
            <Link
                href={`/product/${product.slug?.current}`}
                className="block group relative">
                {/* Product Image */}
                {product.images && product.images[0] && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={imageUrl(product.images[0]).url()}
                            alt={product.name || 'Popular Product'}
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
                        {product.name}
                    </h2>
                    <p className="text-sm text-gray-900 dark:text-gray-300 mt-1">
                        $ {product.price?.toFixed(2)}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProductThumbnail;

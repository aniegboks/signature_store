"use client"

import { Product } from '../../../sanity.types';
import ProductThumbnail from './product_thumbnail';
import { AnimatePresence, motion } from "framer-motion";


import React from 'react';
import Container from './container';

type ProductridProps = {
    slug: string,
    products: Product[]
}
const ProductGrid = ({ products, slug }: ProductridProps) => {
    const formattedSlug = slug
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    return (
        <div className='my-24 py-8'>
            <Container>
                <div className='mb-16'>
                    <h1 className="text-3xl font-bold">
                        {formattedSlug} Collection
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products?.map((product) => (
                        <div key={product._id}>
                            <ProductThumbnail key={product._id} product={product} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default ProductGrid;

import React from 'react';
import Container from './container';
import { ALL_POPULAR_PRODUCTS_QUERYResult } from '../../../sanity.types';
import PopularProducts from './popular_products';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from './button';

type PopularGrdProps = {
    popularProducts: ALL_POPULAR_PRODUCTS_QUERYResult
}
const PopularGrid = ({ popularProducts }: { popularProducts: ALL_POPULAR_PRODUCTS_QUERYResult }) => {
    return (
        <div className='my-24 py-8'>
            <Container>
                <div className='mt-12 flex justify-between'>
                    <h3 className='font-bold text-xl md:text-2xl mb-8'>Popular Products</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {popularProducts?.map((popularProduct) => (
                        <div key={popularProduct._id}>
                            <PopularProducts key={popularProduct._id} popularProduct={popularProduct} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default PopularGrid;

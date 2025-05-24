import React from 'react'
import Image from 'next/image'
import { imageUrl } from '@/lib/imageUrl'
import Link from 'next/link';
import { RELATED_PRODUCT_BY_QUERYResult } from '../../../sanity.types';

type RelatedproductProps = {
    relatedProduct: RELATED_PRODUCT_BY_QUERYResult
}
const RelatedProducts = ({relatedProduct}:RelatedproductProps) => {

    return (
        <div className="my-24">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            {relatedProduct?.related && relatedProduct.related.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
                    {relatedProduct.related.map((item) => (
                        <Link
                            key={item.name}
                            href={`/product/${item.slug?.current}`}
                            className="block rounded overflow-hidden transition"
                        >
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                                <Image
                                    src={item.image?.asset ? imageUrl(item.image).url() : '/assets/img1.jpg'}
                                    alt="related item"
                                    fill
                                    className='rounded-md transition-transform duration-300 hover:scale-105'
                                    objectFit='cover'
                                />
                            </div>
                            <div className='ml-4 mt-4'>
                                <h3 className="font-semibold">{item.name}</h3>
                                <div className='mt-2'>$ {item.price}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No related products found.</p>
            )}
        </div>
    )
}
export default RelatedProducts
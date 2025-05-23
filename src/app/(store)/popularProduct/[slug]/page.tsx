import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/container';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import Gallery from '@/components/ui/gallery';
import Thumbnail from '@/components/ui/thumbnail';
import { GalleryProvider } from '@/components/gallery_context';
import { getRelatedProduct } from '@/sanity/lib/products/getRelatedProduct';
import { RELATED_PRODUCT_BY_QUERYResult } from '../../../../../sanity.types';
import RelatedProducts from '@/components/ui/related_product';
import { Expand, Palette } from 'lucide-react';
import Size from '@/components/ui/size';
import AddToCartButton from '@/components/ui/add_to_cart_button';
import { RevealAnimation } from '@/utils/reveal_animation';
type ProductProps = {
    params: Promise<{ slug: string }>;
};

export const dynamic = "force-static"
export const revalidate = 3600;

const Product = async ({ params }: ProductProps) => {
    const { slug } = await params;

    const product = await getProductBySlug(slug);
    if (!product) return notFound();

    const relatedProductResponse = await getRelatedProduct(slug);
    const relatedProduct = relatedProductResponse?.data as RELATED_PRODUCT_BY_QUERYResult;

    const isOutOfStock = product.stock != null && product.stock <= 0;



    return (
        <div className='py-32 md:py-48'>
            <Container>
                <RevealAnimation>
                    <GalleryProvider>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div
                                    className={`relative aspect-square overflow-hidden rounded-md ${isOutOfStock ? 'opacity-50' : ''
                                        }`}
                                >
                                    <Gallery
                                        images={Array.isArray(product.images) ? product.images : []}
                                        productName={product.name || 'Product'}
                                        isOutOfStock={isOutOfStock}
                                    />
                                    {isOutOfStock && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-red-600 font-bold">
                                            Out of Stock
                                        </div>
                                    )}
                                </div>
                                <Thumbnail
                                    images={Array.isArray(product.images) ? product.images : []}
                                />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold mb-4 tracking-tight">
                                    {product.name}
                                </h1>
                                <div className="text-md font-semibold mb-4">
                                    ${product.price?.toFixed(2)}
                                </div>
                                <div className="text-neutral-700 prose max-w-none mb-6 font-heading">
                                    {product.description}
                                </div>
                                <div>
                                    <div className='mt-4 mb-8 flex items-center'>
                                        <div className='flex items-center'>
                                            <span className=' text-neutral-700 mr-2 font-bold'>Color:</span>
                                        </div>
                                        <div>
                                            <div>
                                                {product?.color?.hex && (
                                                    <div
                                                        className="w-4 h-4 rounded-full border-1 border-black"
                                                        style={{ backgroundColor: product.color.hex }}
                                                    />
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                    <div className='mb-8'>
                                        <div className='flex items-center mb-4'>
                                            <span className='text-neutral-700 mr-4 font-bold'>Measurment:</span>
                                            <Expand size={12} className='text-neutral-700' />
                                        </div>
                                        <Size product={product} />
                                    </div>
                                </div>
                                <AddToCartButton product={product} disabled={isOutOfStock} />
                            </div>
                        </div>
                    </GalleryProvider>
                </RevealAnimation>
                <RevealAnimation>
                    <div>
                        <RelatedProducts relatedProduct={relatedProduct} />

                    </div>
                </RevealAnimation>
            </Container>

        </div>
    );
};

export default Product;

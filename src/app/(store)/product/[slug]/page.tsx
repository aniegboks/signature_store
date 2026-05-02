import React from 'react';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/container';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import Gallery from '@/components/ui/gallery';
import Thumbnail from '@/components/ui/thumbnail';
import { GalleryProvider } from '@/components/gallery_context';
import RelatedProducts from '@/components/ui/related_product';
import { PRODUCT_BY_QUERY_IDResult, RELATED_PRODUCT_BY_QUERYResult } from '../../../../../sanity.types';
import { getRelatedProduct } from '@/sanity/lib/products/getRelatedProduct';
import Size from '@/components/ui/size';
import AddToCartButton from '@/components/ui/add_to_cart_button';
import { RevealAnimation } from '@/utils/reveal_animation';

// Safe Type Extension for Sanity Colors
interface ExtendedColor {
    hex?: string;
    name?: string;
}

type ProductProps = {
    params: Promise<{ slug: string }>
}

export const dynamic = "force-static";
export const revalidate = 3600;

const Product = async ({ params }: ProductProps) => {
    const { slug } = await params;
    const product: PRODUCT_BY_QUERY_IDResult = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }
    const isOutOfStock = product.stock != null && product.stock <= 0;

    const relatedProductResponse = await getRelatedProduct(slug);
    const relatedProduct = relatedProductResponse?.data as RELATED_PRODUCT_BY_QUERYResult;

    // Casting to our extended interface for safe property access
    const productColor = product.color as ExtendedColor;

    return (
        <div className='relative min-h-screen bg-neutral-50 py-32 md:py-40 text-neutral-900'>
            <Container>
                <RevealAnimation>
                    <GalleryProvider>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                            {/* ── LEFT SIDE: EDITORIAL GALLERY ── */}
                            <div className="lg:col-span-7 flex flex-col gap-6">
                                <div className={`relative aspect-[4/5] w-full bg-neutral-100 ${isOutOfStock ? 'opacity-60 grayscale' : ''}`}>

                                    <Gallery
                                        product={product}
                                        isOutOfStock={isOutOfStock}
                                    />

                                    {/* Elegant Out of Stock Overlay */}
                                    {isOutOfStock && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm z-50">
                                            <div className="bg-white/90 text-neutral-900 px-8 py-4 shadow-sm">
                                                <span className="text-[10px] font-sans tracking-[0.3em] uppercase">Archived</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* THUMBNAIL TRACKER */}
                                <div className="border-t border-black/[0.04] pt-6">
                                    <Thumbnail product={product} />
                                </div>
                            </div>

                            {/* ── RIGHT SIDE: PRODUCT DETAILS ── */}
                            <div className="lg:col-span-5 flex flex-col justify-center">

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans">
                                        {product.categories?.[0] ? "Core Collection" : "Essential Archive"}
                                    </span>
                                    <div className="w-4 h-px bg-neutral-300" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans">
                                        Ref—{product._id?.slice(-4).toUpperCase() || '0000'}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 leading-[1.1] mb-6">
                                    {product.name}
                                </h1>

                                <div className="text-lg md:text-xl font-sans text-neutral-500 tracking-widest mb-10">
                                    ${product.price?.toFixed(2)}
                                </div>

                                <div className="mb-12">
                                    <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-md">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="space-y-8 border-t border-black/[0.04] pt-10">

                                    {/* Color Finish */}
                                    <div className='flex items-center justify-between'>
                                        <span className='text-[10px] font-sans text-neutral-400 uppercase tracking-[0.2em]'>Finish</span>
                                        <div>
                                            {productColor?.hex ? (
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs font-sans text-neutral-900 tracking-wider capitalize">
                                                        {productColor.name || productColor.hex}
                                                    </span>
                                                    <div
                                                        className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                                                        style={{ backgroundColor: productColor.hex }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-xs font-sans text-neutral-400">Unspecified</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sizing Parameters */}
                                    <div className='space-y-4'>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-[10px] font-sans text-neutral-400 uppercase tracking-[0.2em]'>Sizing</span>
                                        </div>
                                        <Size product={product} />
                                    </div>
                                </div>

                                {/* Purchase Action */}
                                <div className="pt-12">
                                    <AddToCartButton product={product} disabled={isOutOfStock} />
                                </div>

                                {/* Care Instructions */}
                                <div className="mt-12 pt-8 border-t border-black/[0.04]">
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] mb-2">Garment Care</p>
                                    <p className="text-xs text-neutral-500 font-light leading-relaxed">
                                        Dry clean only. Do not tumble dry. Store folded to maintain structural integrity.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </GalleryProvider>
                </RevealAnimation>

                <RevealAnimation>
                    <div className="mt-40 pt-20 border-t border-black/[0.04]">
                        <RelatedProducts relatedProduct={relatedProduct} />
                    </div>
                </RevealAnimation>
            </Container>
        </div>
    );
};

export default Product;
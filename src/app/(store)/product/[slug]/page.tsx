import React from 'react';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/container';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import Gallery from '@/components/ui/gallery';
import Thumbnail from '@/components/ui/thumbnail'; // Ensure this path is correct
import { GalleryProvider } from '@/components/gallery_context';
import RelatedProducts from '@/components/ui/related_product';
import { PRODUCT_BY_QUERY_IDResult, RELATED_PRODUCT_BY_QUERYResult } from '../../../../../sanity.types';
import { getRelatedProduct } from '@/sanity/lib/products/getRelatedProduct';
import { Expand, Crosshair } from 'lucide-react';
import Size from '@/components/ui/size';
import AddToCartButton from '@/components/ui/add_to_cart_button';
import { RevealAnimation } from '@/utils/reveal_animation';

type ProductProps = {
    params: Promise<{ slug: string }>
}
export const dynamic = "force-static"
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

    return (
        <div className='relative min-h-screen bg-[#F5F5F5] py-32 md:py-48 selection:bg-[#f97316] selection:text-black'>
            
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 0)', backgroundSize: '32px 32px' }} 
            />

            <Container>
                <RevealAnimation>
                    <GalleryProvider>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                            
                            {/* LEFT SIDE: VISUAL DIAGNOSTIC */}
                            <div className="lg:col-span-7 flex flex-col gap-6">
                                <div className={`relative aspect-square w-full bg-white/50 ${isOutOfStock ? 'opacity-40 grayscale' : ''}`}>
                                    
                                    <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-[#f97316] z-10" />
                                    <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-black/20 z-10" />

                                    <Gallery
                                        product={product}
                                        isOutOfStock={isOutOfStock}
                                    />

                                    {isOutOfStock && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50 border border-red-500/20">
                                            <span className="text-red-500 text-[10px] font-mono tracking-[0.4em] mb-2 animate-pulse">ERR_404</span>
                                            <div className="bg-red-500 text-black px-4 py-1 font-mono font-bold tracking-widest uppercase">
                                                Stock_Depleted
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* THUMBNAIL TRACKER */}
                                <div className="border-t border-black/5 pt-4">
                                    <Thumbnail product={product} />
                                </div>
                            </div>

                            {/* RIGHT SIDE: TELEMETRY & DATA */}
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-[#f97316] text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                                        Live_Data
                                    </span>
                                    <span className="text-[10px] font-mono text-black/30 uppercase tracking-[0.3em]">
                                        ID // {product._id?.slice(-6).toUpperCase() || 'UNKNOWN'}
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-serif italic text-black leading-[0.85] uppercase tracking-tighter mb-6">
                                    {product.name}
                                </h1>
                                
                                <div className="inline-flex w-fit bg-black text-[#f97316] px-4 py-2 font-mono text-xl tracking-widest mb-10 shadow-lg">
                                    ${product.price?.toFixed(2)}
                                </div>

                                <div className="relative pl-4 border-l-2 border-black/10 mb-12">
                                    <div className="absolute -left-[2px] top-0 w-0.5 h-8 bg-[#f97316]" />
                                    <p className="text-black/50 font-serif text-lg italic leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="space-y-8 border-t border-black/5 pt-8">
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Crosshair size={12} className='text-[#f97316]' />
                                            <span className='text-[10px] font-mono text-black/40 uppercase tracking-widest'>Material_Finish:</span>
                                        </div>
                                        <div>
                                            {product?.color?.hex ? (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-mono text-black uppercase">{product.color.hex}</span>
                                                    <div
                                                        className="w-6 h-6 border border-black/20 shadow-inner"
                                                        style={{ backgroundColor: product.color.hex }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-mono text-black/20 uppercase">Unspecified</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className='space-y-4'>
                                        <div className='flex items-center gap-2'>
                                            <Expand size={12} className='text-[#f97316]' />
                                            <span className='text-[10px] font-mono text-black/40 uppercase tracking-widest'>Scale_Parameters:</span>
                                        </div>
                                        <Size product={product} />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <AddToCartButton product={product} disabled={isOutOfStock} />
                                </div>

                            </div>
                        </div>
                    </GalleryProvider>
                </RevealAnimation>

                <RevealAnimation>
                    <div className="mt-40 pt-20 border-t border-black/[0.05]">
                        <RelatedProducts relatedProduct={relatedProduct} />
                    </div>
                </RevealAnimation>
            </Container>
        </div>
    );
};

export default Product;
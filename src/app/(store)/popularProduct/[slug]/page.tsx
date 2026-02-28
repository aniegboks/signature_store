import React from "react";
import { notFound } from "next/navigation";
import Container from "@/components/ui/container";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Gallery from "@/components/ui/gallery";
import Thumbnail from "@/components/ui/thumbnail";
import { GalleryProvider } from "@/components/gallery_context";
import { getRelatedProduct } from "@/sanity/lib/products/getRelatedProduct";
import { RELATED_PRODUCT_BY_QUERYResult } from "../../../../../sanity.types";
import RelatedProducts from "@/components/ui/related_product";
import { Expand, ShieldCheck, Zap } from "lucide-react";
import Size from "@/components/ui/size";
import AddToCartButton from "@/components/ui/add_to_cart_button";
import { RevealAnimation } from "@/utils/reveal_animation";

type ProductProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const revalidate = 3600;

const Product = async ({ params }: ProductProps) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const relatedProductResponse = await getRelatedProduct(slug);
  const relatedProduct =
    relatedProductResponse?.data as RELATED_PRODUCT_BY_QUERYResult;

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-32 md:py-48">
      <Container>
        <RevealAnimation>
          <GalleryProvider>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* --- LEFT: VISUAL ASSET CORE --- */}
              <div className="lg:col-span-7 space-y-6">
                <div
                  className={`relative aspect-square overflow-hidden border border-black/[0.03] bg-white`}
                >
                  <Gallery product={product} isOutOfStock={isOutOfStock} />

                  {/* PEACH ON BLACK STATUS TAG */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-20">
                      <div className="bg-black px-8 py-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.6em] text-[#f97316]">
                          Offline_Archive
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <Thumbnail product={product} />
              </div>

              {/* --- RIGHT: TECHNICAL SPECIFICATIONS --- */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-black text-[#f97316] px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest">
                      Spec_Sheet_v3
                    </span>
                    <div className="h-px flex-1 bg-black/[0.05]" />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-black leading-none">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-2xl font-mono text-black">
                      ${product.price?.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-mono text-black/30 uppercase tracking-widest">
                      USD_INTL
                    </span>
                  </div>
                </div>

                <div className="text-neutral-600 prose prose-sm max-w-none font-serif italic leading-relaxed border-l-2 border-black/5 pl-6">
                  {product.description}
                </div>

                <div className="space-y-10 py-10 border-y border-black/[0.05]">
                  {/* Color Swatch */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap size={14} className="text-[#f97316]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">
                        Surface_Finish:
                      </span>
                    </div>
                    {product?.color?.hex && (
                      <div className="flex items-center gap-3 bg-white border border-black/5 px-3 py-1.5 shadow-sm">
                        <div
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: product.color.hex }}
                        />
                        <span className="text-[10px] font-mono text-black">
                          {product.color.hex}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Measurement/Size */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Expand size={14} className="text-black/20" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">
                          Dimensional_Spec:
                        </span>
                      </div>
                    </div>
                    <Size product={product} />
                  </div>
                </div>

                <div className="space-y-6">
                  <AddToCartButton product={product} disabled={isOutOfStock} />

                  <div className="flex items-center gap-4 justify-center py-4 border border-black/[0.03] bg-white/50">
                    <ShieldCheck size={14} className="text-black/20" />
                    <span className="text-[9px] font-mono text-black/30 uppercase tracking-[0.3em]">
                      Guaranteed_Authentic_Artifact
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GalleryProvider>
        </RevealAnimation>

        {/* --- RELATED MANIFEST --- */}
        <RevealAnimation>
          <div className="mt-40 pt-20 border-t border-black/[0.05]">
            <div className="mb-12">
              <span className="text-[10px] font-mono text-black/20 uppercase tracking-[0.5em]">
                Linked_Assets
              </span>
              <h2 className="text-4xl font-serif italic text-black">
                Related Modules
              </h2>
            </div>
            <div>
              <RelatedProducts relatedProduct={relatedProduct} />
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </div>
  );
};

export default Product;

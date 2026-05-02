"use client";
import React from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import { RELATED_PRODUCT_BY_QUERYResult } from "../../../sanity.types";

type RelatedproductProps = {
  relatedProduct: RELATED_PRODUCT_BY_QUERYResult;
};

const RelatedProducts = ({ relatedProduct }: RelatedproductProps) => {
  return (
    <div className="my-32 border-t border-black/[0.04] pt-20">
      {/* --- SECTION HEADER: Tightened spacing --- */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-neutral-400 uppercase tracking-[0.3em] font-medium">
              Curation
            </span>
            <div className="w-8 h-px bg-neutral-200" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-neutral-900 leading-none">
            Complementary <span className="italic text-neutral-400">Silhouettes.</span>
          </h2>
        </div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-300 font-medium">
          REF—0{new Date().getMonth() + 1} // Lookbook_Extract
        </p>
      </div>

      {relatedProduct?.related && relatedProduct.related.length > 0 ? (
        /* --- GRID: Increased to 5 columns on large screens for smaller cards --- */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-16">
          {relatedProduct.related.map((item, i) => (
            <div key={i} className="group">
              <Link
                href={`/product/${item.slug?.current}`}
                className="block relative"
              >
                {/* ── IMAGE VIEWPORT: Reduced margin ── */}
                <div className="relative aspect-[3/4] w-full mb-5 overflow-hidden bg-[#F9F9F9] border border-black/[0.03] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:shadow-lg group-hover:-translate-y-1">

                  {/* Soft Editorial Overlay */}
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/[0.01] transition-colors duration-700 z-10" />

                  <Image
                    src={
                      item.image?.asset
                        ? imageUrl(item.image).url()
                        : "/placeholder.jpg"
                    }
                    alt={item.name || "garment"}
                    fill
                    className="object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  />

                  {/* Minimalist Floating Index */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[8px] font-mono text-neutral-400/60 uppercase">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                  </div>
                </div>

                {/* ── PRODUCT INFO: Scaled down for a professional 'label' feel ── */}
                <div className="space-y-3 px-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-medium text-neutral-400 uppercase tracking-widest">
                      Studio_Inventory
                    </span>
                    <span className="text-[10px] font-medium text-neutral-900 tabular-nums">
                      ${item.price}
                    </span>
                  </div>

                  <div className="relative overflow-hidden">
                    <h3 className="font-serif text-lg text-neutral-900 tracking-tight leading-tight transition-transform duration-500 group-hover:italic">
                      {item.name}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-neutral-900/10 transition-all duration-700" />
                  </div>

                  {/* Minimalist Reveal Info */}
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <p className="text-[7px] font-medium text-neutral-300 uppercase tracking-[0.2em]">
                      View Details
                    </p>
                    <div className="w-4 h-px bg-neutral-200" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 border-y border-black/[0.02] flex items-center justify-center">
          <p className="text-[9px] font-medium text-neutral-200 uppercase tracking-[0.8em]">
            Archival Search Empty
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
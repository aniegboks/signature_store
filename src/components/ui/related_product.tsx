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
    <div className="my-32 border-t border-black/[0.03] pt-16">
      <div className="flex items-center justify-between mb-16">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#f97316] uppercase tracking-[0.5em] animate-pulse">
            Scanning_Subsystems...
          </span>
          <h2 className="text-4xl font-serif italic text-black tracking-tighter">
            Linked Modules
          </h2>
        </div>
      </div>

      {relatedProduct?.related && relatedProduct.related.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-20">
          {relatedProduct.related.map((item, i) => (
            <div key={i}>
              <Link
                href={`/product/${item.slug?.current}`}
                className="group block relative"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[3/4] w-full mb-8 overflow-hidden">
                  {/* 1. THE CROSSHAIR (Hidden until hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute w-full h-[1px] bg-[#f97316]/10" />
                    <div className="absolute h-full w-[1px] bg-[#f97316]/10" />
                    <div className="size-24 border border-[#f97316]/20 rounded-full animate-[ping_3s_linear_infinite]" />
                  </div>

                  {/* 2. THE SCAN LINE (Glitch effect on hover) */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                    <div className="w-full h-[2px] bg-[#f97316]/40 absolute top-0 animate-[scan_1.5s_ease-in-out_infinite]" />
                  </div>

                  {/* 3. THE IMAGE */}
                  <Image
                    src={
                      item.image?.asset
                        ? imageUrl(item.image).url()
                        : "/assets/img1.jpg"
                    }
                    alt={item.name || "module"}
                    fill
                    className="object-contain transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* 4. THE PRICE TAG */}
                  <div className="absolute top-0 right-0 z-20 overflow-hidden">
                    <div className="bg-black text-[#f97316] px-3 py-1 text-[10px] font-mono font-bold translate-y-0 group-hover:-translate-y-full transition-transform duration-300">
                      ${item.price}
                    </div>
                    <div className="absolute inset-0 bg-[#f97316] text-black px-3 py-1 text-[10px] font-mono font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      ACQUIRE
                    </div>
                  </div>
                </div>

                {/* MODULE DATA */}
                <div className="space-y-3 px-1">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-[9px] font-mono text-[#f97316] group-hover:animate-bounce">
                      0{i + 1}
                    </span>
                    <div className="h-[1px] flex-1 bg-black/10 origin-left scale-x-100 group-hover:scale-x-50 group-hover:bg-[#f97316] transition-all duration-500" />
                    <span className="text-[7px] font-mono text-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity">
                      LOCKED
                    </span>
                  </div>

                  <h3 className="font-serif italic text-xl text-black group-hover:pl-2 transition-all duration-500">
                    {item.name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <p className="text-[8px] font-mono text-black/30 uppercase tracking-[0.2em]">
                      Unit_
                      {Math.random().toString(36).substring(9).toUpperCase()}
                    </p>
                    <div className="size-1 bg-black/10 group-hover:bg-[#f97316] transition-colors" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 border-y border-dashed border-black/10 flex items-center justify-center">
          <p className="text-[10px] font-mono text-black/30 uppercase tracking-[0.6em]">
            No_Linked_Modules
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan {
          0% {
            top: -10%;
          }
          100% {
            top: 110%;
          }
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;

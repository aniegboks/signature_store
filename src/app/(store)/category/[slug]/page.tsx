import React from 'react';
import Container from '@/components/ui/container';
import { getProductByCategory } from '@/sanity/lib/products/getProductByCategory';
import ProductGrid from '@/components/ui/product_grid';
import CategoryHero from '@/components/categoy_hero';

const Category = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const products = await getProductByCategory(slug);

    return (
        <div className="bg-white min-h-screen"> 
            {/* 65dvh Black Hero Section */}
            <CategoryHero 
                title={slug.replace('-', ' ')} 
                subtitle="High-performance curation for the digital archive."
            />

            {/* Product Grid Section - Clean White Aesthetic */}
            <div className="relative border-t border-black/[0.05]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        
                        {/* Sidebar Telemetry (Desktop Only) */}
                        <aside className="hidden lg:block lg:col-span-2 py-20 border-r border-black/[0.05] pr-8">
                            <div className="sticky top-32 space-y-12">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-black/20">Filtering_</h4>
                                    <div className="h-px w-full bg-black/[0.05]" />
                                    <p className="text-[11px] font-mono text-black/40 leading-relaxed uppercase">
                                        All assets are sorted by velocity and structural relevance.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-mono text-orange-500/50 uppercase tracking-tighter">Live_Archive</span>
                                    <div className="size-1.5 bg-orange-500 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </aside>

                        {/* Main Grid Area */}
                        <main className="lg:col-span-10 py-20 lg:pl-12">
                            {/* Grid Header */}
                            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-serif italic text-black tracking-tight">Available Units</h3>
                                    <p className="text-[10px] font-mono text-black/30 uppercase tracking-[0.4em]">Index_Selection // {products.length} Results</p>
                                </div>
                                <div className="h-px flex-1 bg-black/[0.03] mx-8 hidden md:block" />
                                <div className="text-[10px] font-mono text-black/20 uppercase tracking-widest">
                                    Sorted_By: [Chronology]
                                </div>
                            </div>

                            {/* The Grid Component */}
                            <div className="product-grid-wrapper">
                                <ProductGrid products={products} slug={slug}/>
                            </div>
                        </main>
                        
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Category;
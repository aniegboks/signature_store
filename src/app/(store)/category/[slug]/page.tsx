import React from 'react';
import Container from '@/components/ui/container';
import { getProductByCategory } from '@/sanity/lib/products/getProductByCategory';
import ProductGrid from '@/components/ui/product_grid';
import CategoryHero from '@/components/categoy_hero';

const Category = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const products = await getProductByCategory(slug);

    // Format slug for elegant display (e.g., "heavy-hoodies" -> "Heavy Hoodies")
    const formattedTitle = slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="bg-neutral-50 min-h-screen text-neutral-900">

            {/* Minimalist Hero Section */}
            <CategoryHero
                title={formattedTitle}
                subtitle="Explore our curated selection of foundational garments and seasonal silhouettes."
            />

            {/* Product Grid Section - High-End Editorial Aesthetic */}
            <div className="relative border-t border-black/[0.04]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                        {/* ── Left Sidebar: Editorial Anchor (Desktop Only) ── */}
                        <aside className="hidden lg:flex flex-col lg:col-span-3 py-24 border-r border-black/[0.04] pr-12">
                            <div className="sticky top-40">

                                <div className="space-y-4">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block">
                                        Category Focus
                                    </span>
                                    <h4 className="text-2xl font-serif text-neutral-900 tracking-tight">
                                        {formattedTitle}
                                    </h4>
                                    <div className="h-px w-full bg-black/[0.04] my-6" />
                                    <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                        Meticulously crafted pieces designed for longevity. Each garment explores the balance between form, drape, and structural integrity.
                                    </p>
                                </div>

                            </div>
                        </aside>

                        {/* ── Right Main Area: The Product Grid ── */}
                        <main className="lg:col-span-9 py-20 lg:py-24 lg:pl-16">

                            {/* Grid Header */}
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-black/[0.04] pb-8">
                                <div className="space-y-2">
                                    <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-neutral-900">
                                        The <span className="italic text-neutral-400">Collection.</span>
                                    </h3>
                                </div>

                                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-4">
                                    <span>Viewing</span>
                                    <span className="text-neutral-900 border-b border-neutral-900 pb-0.5">
                                        {String(products.length).padStart(2, '0')} Pieces
                                    </span>
                                </div>
                            </div>

                            {/* The Grid Component */}
                            <div className="product-grid-wrapper">
                                <ProductGrid products={products} slug={slug} />
                            </div>

                        </main>

                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Category;
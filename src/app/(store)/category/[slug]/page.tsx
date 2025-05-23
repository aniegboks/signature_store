import React from 'react';
import Container from '@/components/ui/container';
import { getProductByCategory } from '@/sanity/lib/products/getProductByCategory';
import ProductGrid from '@/components/ui/product_grid';
import BannerSection from '@/components/banner';
import { getActiveBanner } from "@/sanity/lib/banner/getActiveBanner";

export const dynamic = "force-static"
export const revalidate = 3600;

type CategoryProps = {
    params: Promise<{ slug: string }>,
}
const Category = async ({ params }: CategoryProps) => {
    const { slug } = await params;

    const products = await getProductByCategory(slug);
    //const categories = await getFeaturedCategories();
    const banner = await getActiveBanner();


 

    return (
        <div>
            <BannerSection banner={banner} />
            <Container>
                <div className="grid grid-cols-3 mt-8">
                    <div className="col-span-3">
                        <ProductGrid products={products} slug={slug}/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Category;

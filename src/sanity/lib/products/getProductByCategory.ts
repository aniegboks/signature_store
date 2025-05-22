import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categorySlug: string) => {
    const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product"
            && references(*[_type == "category" && title in ["Hoodies", "Blazers"] && slug.current == $categorySlug]._id)
        ] | order(name asc)
        `);

    try {
        //fetch te product and pass to category
        const products = await sanityFetch({
            query: PRODUCT_BY_CATEGORY_QUERY,
            params: {
                categorySlug,
            },
        })
        return products.data || [];
    } catch (error) {
        console.error("Error fetching products by category:", error)
        return [];
    }
};
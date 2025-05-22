import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// fetch all the categories from sanity
export const getAllPopularProducts = async () => {
    const ALL_POPULAR_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && "Popular" in categories[] -> title] | order(name asc)`);

    try {
        const popularProducts = await sanityFetch({
            query: ALL_POPULAR_PRODUCTS_QUERY,
        });

        return popularProducts.data || [];
    } catch (error) {
        console.error("Error fetching popular products:", error);
        return [];
    }
}
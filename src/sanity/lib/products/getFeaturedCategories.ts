import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// fetch all the products from sanity
export const getFeaturedCategories = async () => {
    const FEATURED_CATEGORIES_QUERY = defineQuery(`*[_type == "category" && title in ["Hoodies", "Blazers"]] | order(name asc)`);

    try {
        const featuredCategories = await sanityFetch({
            query: FEATURED_CATEGORIES_QUERY,
        });

        return featuredCategories.data || [];
    } catch (error) {
        console.error("Error fetching featured categories:", error);
        return [];
    }
}
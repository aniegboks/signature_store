import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// fetch all the products from sanity
export const getActiveBanner = async () => {
    const ALL_BANNERS_QUERY = defineQuery(`*[_type == "banner"] | order(name asc)`);

    try {
        const banner = await sanityFetch({
            query: ALL_BANNERS_QUERY,
        });

        return banner.data || [];
    } catch (error) {
        console.error("Error fetching banner:", error);
        return [];
    }
}
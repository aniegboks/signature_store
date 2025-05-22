import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// fetch all the products from sanity
export const getFaq = async () => {
    const ALL_FAQ_QUERY = defineQuery(`*[_type == "faq"] | order(name asc)`);

    try {
        const faq = await sanityFetch({
            query: ALL_FAQ_QUERY,
        });

        return faq.data || [];
    } catch (error) {
        console.error("Error fetching banner:", error);
        return [];
    }
}
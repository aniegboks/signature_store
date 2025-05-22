import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// fetch all the products from sanity
export const getAllTestimonials = async () => {
    const ALL_TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(name asc)`);

    try {
        const testimonials = await sanityFetch({
            query: ALL_TESTIMONIALS_QUERY,
        });

        return testimonials.data || [];
    } catch (error) {
        console.error("Error fetching banner:", error);
        return [];
    }
}
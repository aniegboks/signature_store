import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const PRODUCT_BY_QUERY_ID = defineQuery(`
  *[
    _type == "product" && slug.current == $slug
  ] | order(name asc) [0]
`);

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_QUERY_ID,
      params: {
        slug,
      },
    });

    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

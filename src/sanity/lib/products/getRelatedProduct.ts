import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const RELATED_PRODUCT_BY_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    images,
    categories[]->,
    "related": *[
      _type == "product" &&
      _id != ^._id &&
      count(categories[@._ref in ^.categories[]._ref]) > 0
    ] | order(name asc, price asc)[0..4] {
      name,
      slug,
      price,
      "image": images[0]
    }
  }
`);

export const getRelatedProduct = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: RELATED_PRODUCT_BY_QUERY,
      params: { slug },
    });
    return product || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

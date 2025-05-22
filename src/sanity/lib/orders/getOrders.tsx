import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_QUERY_ORDERS = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      product[] {
        ...,
        product->
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: MY_QUERY_ORDERS,
      params: { userId },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
};

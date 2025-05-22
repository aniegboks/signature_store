// app/actions/createCheckoutSession.ts
"use server";

import stripe from "@/lib/stripe";
import { imageUrl } from "@/lib/imageUrl";
import { CartItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedCartItem = {
  product: CartItem["product"];
  quantity: number;
};

export type CheckoutResponse = {
  success: boolean;
  message: string;
};

export async function createCheckoutSession(
  items: GroupedCartItem[],
  metadata: Metadata
): Promise<CheckoutResponse> {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price.");
    }

    const customerList = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId =
      customerList.data.length > 0 ? customerList.data[0].id : undefined;

    const baseUrl =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined in environment variables.");
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: customerId ? undefined : metadata.customerEmail,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.images
              ? [imageUrl(item.product.images[0]).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return {
      success: true,
      message: session.url!,
    };
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return {
      success: false,
      message: error?.message || "Failed to create checkout session.",
    };
  }
}

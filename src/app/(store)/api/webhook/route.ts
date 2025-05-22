// app/api/stripe-webhook/route.ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import { Metadata } from "@/action/createCheckkoutSession";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!signature) {
    console.error("Missing Stripe signature");
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order saved:", order._id);
    } catch (err) {
      console.error("Sanity create error:", err);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
  } = metadata as Metadata;

  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const products = lineItems.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    if (!product.metadata?.id) {
      throw new Error(`Missing Sanity ID on product: ${product.name}`);
    }

    return {
      _key: crypto.randomUUID(),
      product: { _type: "reference", _ref: product.metadata.id },
      quantity: item.quantity ?? 0,
    };
  });

  const amountDiscount = total_details?.amount_discount ?? 0;

  return await client.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripeCustomerId: typeof customer === "string" ? customer : "",
    clerkUserId,
    customerName,
    email: customerEmail,
    stripePaymentIntentId: typeof payment_intent === "string" ? payment_intent : "",
    products,
    totalPrice: amount_total,
    currency,
    ammountDiscount: amountDiscount,
    status: "paid",
    orderDate: new Date().toISOString(),
  });
}

import "server-only";

// 1. Update this import path to point to the /live subpath
import { defineLive } from "next-sanity/live"; 
import { client } from "./client";

const token = process.env.SANITY_READ_API_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_READ_API_TOKEN in environment variables");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: 'vX' 
  }),
  serverToken: token,
  browserToken: token,
  // Note: If you are on the absolute newest versions of next-sanity (v13+), 
  // the fetchOptions property has actually been removed and you can delete this block!
  fetchOptions: {
    revalidate: 0
  }
});
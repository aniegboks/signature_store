import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  stega: {
    /* 
    studioUrl: process.env.VERCEL_URL
       ? `https://${process.env.VERCEL_URL}/studio`
       : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`
       */
    studioUrl: process.env.NODE_ENV == "production"
      ? `https://${process.env.VERCEL_URL}/studio`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`
  }
});
  
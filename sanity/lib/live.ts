// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './client'

// Check if Sanity is configured
const hasSanityConfig = 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_DATASET

// Tokens are optional - only needed for draft preview
// For published content only, we can silence the warnings
const serverToken = process.env.SANITY_API_READ_TOKEN || false
const browserToken = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN || false

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: 'vX' 
  }),
  // Only provide tokens if they exist, otherwise silence warnings
  serverToken: serverToken || false,
  browserToken: browserToken || false,
});

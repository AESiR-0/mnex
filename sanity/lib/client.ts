import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

import { apiVersion, dataset, projectId } from '../env'

// Base client configuration
const baseConfig = {
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
}

// Create client with stega enabled when draft mode is active
export async function getClient() {
  const draft = await draftMode()
  const isDraft = draft.isEnabled

  // Determine studio URL - must match where Sanity Studio is actually running
  // This should match the origin in sanity.config.ts presentationTool previewUrl
  const studioUrl = process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/studio`
    : 'http://localhost:3000/studio' // Default to port 3000 (same as Next.js app)

  return createClient({
    ...baseConfig,
    useCdn: !isDraft, // Disable CDN in draft mode for fresh data
    stega: {
      // Enable Content Source Maps for visual editing when in draft mode
      enabled: isDraft,
      studioUrl,
    },
  })
}

// Default client (for backwards compatibility, stega disabled)
export const client = createClient({
  ...baseConfig,
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})

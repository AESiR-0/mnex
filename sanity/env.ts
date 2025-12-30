export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-20'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// Only warn once on server startup, not on every request
let hasWarned = false
if (typeof window === 'undefined' && !hasWarned && (!process.env.NEXT_PUBLIC_SANITY_DATASET || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)) {
  console.warn('Sanity environment variables are missing. Sanity features will not work.');
  hasWarned = true
}

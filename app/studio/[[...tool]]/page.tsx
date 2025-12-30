import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

// Force dynamic rendering for Sanity Studio
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}

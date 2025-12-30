import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/en'

  // Check the secret token (optional but recommended for security)
  // For now, we'll allow any request from localhost
  // In production, set DRAFT_SECRET in .env.local
  const expectedSecret = process.env.DRAFT_SECRET || 'development-secret'
  
  // Allow draft mode if secret matches or if it's a localhost request
  const isLocalhost = request.headers.get('host')?.includes('localhost')
  
  if (secret !== expectedSecret && !isLocalhost) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the requested page
  redirect(slug)
}

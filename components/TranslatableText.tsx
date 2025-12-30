'use client'

import { useTranslations, useMessages } from 'next-intl'
import { useEffect, useState, type ElementType, useMemo } from 'react'

interface TranslationMetadata {
  documentId: string
  key: string
  locale: string
}

/**
 * Component that renders translation text with stega attributes for visual editing
 * This enables click-to-edit functionality in Sanity Studio's Presentation Tool
 * 
 * Usage:
 * <TranslatableText translationKey="Navigation.about" />
 * <TranslatableText translationKey="Home.hero.line1" as="h1" className="text-2xl" />
 */
export default function TranslatableText({
  translationKey,
  className,
  as: Component = 'span',
  values,
  ...props
}: {
  translationKey: string
  className?: string
  as?: ElementType
  values?: Record<string, any>
  [key: string]: any
}) {
  const t = useTranslations()
  const messages = useMessages()
  const [isDraft, setIsDraft] = useState(false)
  const text = values ? t(translationKey, values) : t(translationKey)

  // Get translation metadata from messages (passed from server)
  const metadataMap = useMemo(() => {
    const metadata = (messages as any).__translationMetadata as TranslationMetadata[] | undefined
    if (!metadata) return new Map<string, TranslationMetadata>()
    
    const map = new Map<string, TranslationMetadata>()
    metadata.forEach(item => {
      map.set(item.key, item)
    })
    return map
  }, [messages])

  useEffect(() => {
    // Check if we're in draft mode by checking URL params or cookies
    // Next.js draft mode sets __prerender_bypass cookie
    // Sanity preview adds sanity-preview param
    const params = new URLSearchParams(window.location.search)
    const cookies = document.cookie
    const isDraftMode = 
      params.has('sanity-preview') || 
      params.has('draft') ||
      cookies.includes('__prerender_bypass') ||
      cookies.includes('__next_preview_data') ||
      cookies.includes('__draft_mode')
    setIsDraft(isDraftMode)
  }, [])

  // Get translation metadata for stega attributes
  const metadata = metadataMap.get(translationKey)

  // In draft mode with metadata, add stega attributes for visual editing
  if (isDraft && metadata) {
    const dataAttributes = {
      'data-sanity': metadata.documentId,
      'data-sanity-field': 'value',
      'data-sanity-type': 'translation',
      'data-sanity-document-id': metadata.documentId,
    }

    return (
      <Component
        className={className}
        {...dataAttributes}
        {...props}
      >
        {text}
      </Component>
    )
  }

  // Normal rendering in production or without metadata
  return (
    <Component className={className} {...props}>
      {text}
    </Component>
  )
}

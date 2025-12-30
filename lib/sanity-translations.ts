import { getClient } from '@/sanity/lib/client'

export interface Translation {
  _id: string // Document ID for stega/visual editing
  locale: string
  key: string
  value: string
  namespace?: string
}

// Store translation metadata for visual editing
export interface TranslationMetadata {
  documentId: string
  key: string
  locale: string
}

// Global map of translation keys to document IDs (for visual editing)
// This is populated server-side and should be accessible client-side
export const translationMetadataMap = new Map<string, TranslationMetadata>()

/**
 * Get translation metadata for a given key (client-side accessible)
 */
export function getTranslationMetadata(key: string): TranslationMetadata | undefined {
  return translationMetadataMap.get(key)
}

/**
 * Fetches all translations for a given locale from Sanity
 */
export async function getTranslationsFromSanity(locale: string): Promise<Record<string, any>> {
  try {
    // Use getClient() to get a client with stega enabled in draft mode
    const client = await getClient()
    // Fetch translations with document IDs for visual editing
    const translations = await client.fetch<Translation[]>(
      `*[_type == "translation" && locale == $locale] | order(key asc) {
        _id,
        locale,
        key,
        value,
        namespace
      }`,
      { locale }
    )

    if (!translations || translations.length === 0) {
      console.warn(`No translations found for locale: ${locale}`)
      return {}
    }

    // Convert flat translations array to nested object structure
    const messages: Record<string, any> = {}

    for (const translation of translations) {
      const keys = translation.key.split('.')
      let current = messages

      // Navigate/create nested structure
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!current[key]) {
          current[key] = {}
        }
        current = current[key]
      }

      // Set the final value (stega encoding is already in the string when fetched with stega enabled)
      const finalKey = keys[keys.length - 1]
      current[finalKey] = translation.value

      // Store metadata for visual editing (map translation key to document ID)
      translationMetadataMap.set(translation.key, {
        documentId: translation._id,
        key: translation.key,
        locale: translation.locale,
      })
    }

    return messages
  } catch (error) {
    console.error(`Error fetching translations from Sanity for locale ${locale}:`, error)
    return {}
  }
}

/**
 * Fallback to JSON files if Sanity fails or is not configured
 */
async function getTranslationsFromJSON(locale: string): Promise<Record<string, any>> {
  try {
    const messages = (await import(`../messages/${locale}.json`)).default
    return messages
  } catch (error) {
    console.error(`Failed to load JSON messages for locale: ${locale}`, error)
    // Try English fallback
    if (locale !== 'en') {
      try {
        return (await import(`../messages/en.json`)).default
      } catch {
        return {}
      }
    }
    return {}
  }
}

/**
 * Get translations with fallback: Sanity first, then JSON files
 */
export async function getTranslations(locale: string): Promise<Record<string, any>> {
  // Check if Sanity is configured
  const hasSanityConfig = 
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
    process.env.NEXT_PUBLIC_SANITY_DATASET

  if (hasSanityConfig) {
    const sanityMessages = await getTranslationsFromSanity(locale)
    // If Sanity returns translations, use them; otherwise fallback to JSON
    if (Object.keys(sanityMessages).length > 0) {
      return sanityMessages
    }
  }

  // Fallback to JSON files
  return getTranslationsFromJSON(locale)
}

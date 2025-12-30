/**
 * Script to import translations from JSON files to Sanity
 * 
 * Usage:
 *   npx tsx scripts/import-translations-to-sanity.ts
 * 
 * Make sure your Sanity environment variables are set in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 */

// Load environment variables FIRST, before any other imports
// Using require() ensures it runs synchronously before module evaluation
import { resolve } from 'path'
const dotenv = require('dotenv')

// Load .env.local file (takes precedence)
dotenv.config({ path: resolve(process.cwd(), '.env.local') })
// Also try .env as fallback
dotenv.config({ path: resolve(process.cwd(), '.env') })

// Now import other modules (env vars are loaded)
import { createClient } from 'next-sanity'
import enMessages from '../messages/en.json'
import zhMessages from '../messages/zh.json'

// Create client with environment variables (loaded from dotenv)
// For write operations, we need a token with Editor or Administrator permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-20',
  useCdn: false, // Disable CDN for write operations
  token: process.env.SANITY_API_WRITE_TOKEN, // Token with write permissions
})

interface Translation {
  _type: 'translation'
  locale: string
  key: string
  value: string
  namespace?: string
}

/**
 * Flattens a nested object into dot-notation keys
 */
function flattenObject(obj: any, prefix = '', result: Record<string, string> = {}): Record<string, string> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result)
      } else {
        result[newKey] = String(obj[key])
      }
    }
  }
  return result
}

/**
 * Extracts namespace from key (first part before first dot)
 */
function getNamespace(key: string): string | undefined {
  const parts = key.split('.')
  return parts.length > 1 ? parts[0] : undefined
}

async function importTranslations(locale: string, messages: any) {
  console.log(`\n📦 Importing ${locale} translations...`)
  
  const flattened = flattenObject(messages)
  const translations: Translation[] = []
  
  for (const [key, value] of Object.entries(flattened)) {
    translations.push({
      _type: 'translation',
      locale,
      key,
      value,
      namespace: getNamespace(key),
    })
  }
  
  console.log(`   Found ${translations.length} translation keys`)
  
  // Check for existing translations
  const existingKeys = await client.fetch<string[]>(
    `*[_type == "translation" && locale == $locale].key`,
    { locale }
  )
  
  const existingKeysSet = new Set(existingKeys)
  const newTranslations: Translation[] = []
  const updatedTranslations: Translation[] = []
  const skippedTranslations: Translation[] = []
  
  // Separate new vs existing translations
  for (const translation of translations) {
    if (existingKeysSet.has(translation.key)) {
      // Skip existing translations (don't overwrite)
      skippedTranslations.push(translation)
    } else {
      // Only import new translations
      newTranslations.push(translation)
    }
  }
  
  console.log(`   - New translations to import: ${newTranslations.length}`)
  console.log(`   - Existing translations (skipped): ${skippedTranslations.length}`)
  
  if (newTranslations.length === 0) {
    console.log(`   ⚠️  No new translations to import for ${locale}`)
    return
  }
  
  // Import only new translations in batches
  const batchSize = 100
  let imported = 0
  
  for (let i = 0; i < newTranslations.length; i += batchSize) {
    const batch = newTranslations.slice(i, i + batchSize)
    const transaction = client.transaction()
    
    for (const translation of batch) {
      transaction.create(translation)
    }
    
    await transaction.commit()
    imported += batch.length
    console.log(`   Imported ${imported}/${newTranslations.length} new translations...`)
  }
  
  console.log(`✅ Successfully imported ${imported} new ${locale} translations`)
}

async function main() {
  try {
    console.log('🚀 Starting translation import to Sanity...')
    
    // Check if Sanity is configured
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
      console.error('❌ Sanity environment variables are not set!')
      console.error('   Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET')
      process.exit(1)
    }
    
    // Check for write token (required for creating documents)
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('❌ SANITY_API_WRITE_TOKEN is not set!')
      console.error('   This token is required to create/import translations.')
      console.error('   Get it from: https://sanity.io/manage -> Your Project -> API -> Tokens')
      console.error('   Create a token with "Editor" or "Administrator" permissions')
      console.error('   Add it to .env.local as: SANITY_API_WRITE_TOKEN=your-token-here')
      process.exit(1)
    }
    
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
    console.log(`   Token: ${process.env.SANITY_API_WRITE_TOKEN.substring(0, 10)}... (hidden)`)
    
    // Import English translations
    await importTranslations('en', enMessages)
    
    // Import Chinese translations
    await importTranslations('zh', zhMessages)
    
    console.log('\n🎉 All translations imported successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Go to your Sanity Studio at /studio')
    console.log('   2. Review and edit translations as needed')
    console.log('   3. Your app will now use Sanity translations')
    
  } catch (error) {
    console.error('❌ Error importing translations:', error)
    process.exit(1)
  }
}

main()

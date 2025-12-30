import { getRequestConfig } from 'next-intl/server';
import { getTranslations, translationMetadataMap } from '@/lib/sanity-translations';
 
export default getRequestConfig(async ({ requestLocale }) => {
  try {
    const locale = await requestLocale;
    
    // Provide a fallback locale if none is provided
    const validLocale = locale || 'en';
    
    // Get translations from Sanity (with JSON fallback)
    const messages = await getTranslations(validLocale);
    
    // Serialize translation metadata for client-side access
    // Store it in a special key that won't conflict with translations
    const metadata = Array.from(translationMetadataMap.entries()).map(([key, value]) => ({
      ...value
    }));
    
    return {
      locale: validLocale,
      messages: {
        ...messages,
        // Store metadata in a special namespace (won't be used as translation)
        __translationMetadata: metadata
      }
    };
  } catch (error) {
    console.error('Error in getRequestConfig:', error);
    // Return minimal config to prevent complete failure
    return {
      locale: 'en',
      messages: {}
    };
  }
});

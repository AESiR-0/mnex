import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ requestLocale }) => {
  try {
    const locale = await requestLocale;
    
    // Provide a fallback locale if none is provided
    const validLocale = locale || 'en';
    
    try {
      const messages = (await import(`../messages/${validLocale}.json`)).default;
      return {
        locale: validLocale,
        messages
      };
    } catch (error) {
      console.error(`Failed to load messages for locale: ${validLocale}`, error);
      // Fallback to English if the requested locale fails
      if (validLocale !== 'en') {
        try {
          const fallbackMessages = (await import(`../messages/en.json`)).default;
          return {
            locale: 'en',
            messages: fallbackMessages
          };
        } catch (fallbackError) {
          console.error('Failed to load fallback messages:', fallbackError);
          return {
            locale: 'en',
            messages: {}
          };
        }
      }
      return {
        locale: validLocale,
        messages: {}
      };
    }
  } catch (error) {
    console.error('Error in getRequestConfig:', error);
    // Return minimal config to prevent complete failure
    return {
      locale: 'en',
      messages: {}
    };
  }
});

# Sanity Translations Setup Guide

This guide will help you set up Sanity CMS to manage translations for your Next.js application.

## Overview

Your application now supports translations from Sanity CMS with automatic fallback to JSON files. This allows content editors to manage translations directly in Sanity Studio without code changes.

## Setup Steps

### 1. Configure Sanity Environment Variables

Make sure you have these environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-20
```

### 2. Access Sanity Studio

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/studio` in your browser
   - Example: `http://localhost:3000/studio`

3. Log in to Sanity Studio with your Sanity account

### 3. Import Existing Translations

To migrate your existing JSON translations to Sanity:

```bash
npm run import-translations
```

This script will:
- Read translations from `messages/en.json` and `messages/zh.json`
- Convert nested JSON structure to flat key-value pairs
- Import all translations into Sanity
- Delete any existing translations for the same locale first

### 4. How It Works

#### Translation Structure

Translations are stored in Sanity with this structure:
- **Locale**: `en` or `zh`
- **Key**: Dot-notation path (e.g., `Navigation.about` or `Home.hero.line1`)
- **Value**: The translated text
- **Namespace**: Optional grouping (extracted from the key)

#### Automatic Fallback

The system works as follows:
1. **First**: Tries to fetch translations from Sanity
2. **Fallback**: If Sanity is not configured or returns no results, uses JSON files
3. **Safety**: If both fail, returns empty object (prevents crashes)

#### Example Translation Keys

- `Navigation.about` → "About Us"
- `Home.hero.line1` → "Shaping Precision,"
- `Solutions.tooling` → "Tooling"
- `Footer.singapore.address1` → "8 Temasek Blvd, Suntec Tower 3"

### 5. Managing Translations in Sanity Studio

1. Go to `/studio`
2. Click on **"Translation"** in the sidebar
3. You'll see all translations organized by locale
4. Click on any translation to edit it
5. Changes are saved automatically

#### Adding New Translations

1. Click **"Create new"** → **"Translation"**
2. Select the **Locale** (en or zh)
3. Enter the **Translation Key** (e.g., `NewSection.title`)
4. Enter the **Translation Value**
5. Save

#### Editing Existing Translations

1. Find the translation in the list
2. Click to open it
3. Edit the **Translation Value**
4. Save

### 6. Translation Key Naming Convention

Use dot notation for nested structure:
- `Section.subsection.key` → Creates nested object: `{ Section: { subsection: { key: "value" } } }`

Examples:
- `Navigation.about` → `Navigation.about`
- `Home.hero.line1` → `Home.hero.line1`
- `Footer.singapore.address1` → `Footer.singapore.address1`

### 7. Development Workflow

#### Option A: Use Sanity (Recommended for Production)
- Content editors manage translations in Sanity Studio
- No code changes needed for translation updates
- Changes are live immediately (with revalidation)

#### Option B: Use JSON Files (For Development)
- Edit `messages/en.json` and `messages/zh.json` directly
- If Sanity is not configured, JSON files are used automatically
- Run `npm run import-translations` to sync to Sanity when ready

### 8. Troubleshooting

#### Translations not showing from Sanity
1. Check environment variables are set correctly
2. Verify translations exist in Sanity Studio
3. Check browser console for errors
4. Ensure Sanity client is properly configured

#### Import script fails
1. Verify Sanity environment variables
2. Check you're logged into Sanity Studio
3. Ensure you have write permissions for the dataset

#### Want to switch back to JSON only
- Simply remove or comment out Sanity environment variables
- The system will automatically fall back to JSON files

### 9. Advanced: Custom Queries

You can customize the translation fetching in `lib/sanity-translations.ts`:

```typescript
// Example: Filter by namespace
const translations = await client.fetch(
  `*[_type == "translation" && locale == $locale && namespace == $namespace]`,
  { locale, namespace: 'Navigation' }
)
```

## Files Created/Modified

- ✅ `sanity/schemaTypes/translation.ts` - Sanity schema for translations
- ✅ `sanity/schemaTypes/index.ts` - Updated to include translation schema
- ✅ `lib/sanity-translations.ts` - Utility functions for fetching translations
- ✅ `i18n/request.ts` - Updated to use Sanity with JSON fallback
- ✅ `scripts/import-translations-to-sanity.ts` - Migration script

## Next Steps

1. ✅ Set up Sanity environment variables
2. ✅ Run `npm install` to get `tsx` dependency
3. ✅ Run `npm run import-translations` to migrate existing translations
4. ✅ Test by editing a translation in Sanity Studio
5. ✅ Verify the change appears on your website

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check server logs for Sanity connection issues
3. Verify your Sanity project is accessible
4. Ensure environment variables are correctly set

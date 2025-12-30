'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool, defineDocuments} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Presentation Tool for live preview and draft content
    // https://www.sanity.io/docs/presentation
    presentationTool({
      // Configure where to preview content
      previewUrl: {
        // Use environment variable or default to localhost for development
        // In production, set NEXT_PUBLIC_SITE_URL to your production URL
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      },
      // Allow origins for preview (supports wildcards for ports)
      allowOrigins: [
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:*', // Allow any localhost port
      ],
      // Configure resolve to show translation documents in sidebar
      // Note: The filter matches multiple documents, but mainDocuments expects one
      // The Presentation Tool may show one or show "multiple documents"
      // Visual editing works via stega attributes for ALL translations regardless
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/:locale',
            filter: `_type == "translation" && locale == $locale`,
            params: { locale: 'string' },
          },
        ]),
      },
    }),
  ],
})

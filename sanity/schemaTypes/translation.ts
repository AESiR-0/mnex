import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'translation',
  title: 'Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English (en)', value: 'en' },
          { title: 'Chinese (zh)', value: 'zh' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'en',
    }),
    defineField({
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      description: 'The translation key (e.g., "Navigation.about" or "Home.hero.line1")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Translation Value',
      type: 'text',
      description: 'The translated text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'namespace',
      title: 'Namespace',
      type: 'string',
      description: 'Optional namespace grouping (e.g., "Navigation", "Home") - auto-extracted from key',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Locale, then Key',
      name: 'localeKeyAsc',
      by: [
        { field: 'locale', direction: 'asc' },
        { field: 'key', direction: 'asc' },
      ],
    },
    {
      title: 'Key, then Locale',
      name: 'keyLocaleAsc',
      by: [
        { field: 'key', direction: 'asc' },
        { field: 'locale', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      locale: 'locale',
      key: 'key',
      value: 'value',
      namespace: 'namespace',
    },
    prepare({ locale, key, value, namespace }) {
      const localeLabel = locale === 'en' ? '🇬🇧 EN' : '🇨🇳 ZH'
      return {
        title: `${localeLabel} ${key}`,
        subtitle: value?.substring(0, 80) || '',
      }
    },
  },
})

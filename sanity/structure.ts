import type {StructureResolver} from 'sanity/structure'
import {apiVersion} from './env'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Translations section with locale grouping
      S.listItem()
        .title('Translations')
        .child(
          S.list()
            .title('Translations by Locale')
            .items([
              S.listItem()
                .title('🇬🇧 English (en)')
                .child(
                  S.documentList()
                    .title('English Translations')
                    .apiVersion(apiVersion)
                    .filter('_type == "translation" && locale == "en"')
                    .defaultOrdering([{ field: 'key', direction: 'asc' }])
                ),
              S.listItem()
                .title('🇨🇳 Chinese (zh)')
                .child(
                  S.documentList()
                    .title('Chinese Translations')
                    .apiVersion(apiVersion)
                    .filter('_type == "translation" && locale == "zh"')
                    .defaultOrdering([{ field: 'key', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('All Translations')
                .child(
                  S.documentTypeList('translation')
                    .title('All Translations')
                    .defaultOrdering([{ field: 'locale', direction: 'asc' }, { field: 'key', direction: 'asc' }])
                ),
            ])
        ),
      S.divider(),
      // Other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['translation'].includes(listItem.getId() || '')
      ),
    ])

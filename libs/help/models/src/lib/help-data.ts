/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Document } from "@contentful/rich-text-types"

export interface HelpExternalLink {
  title: string
  url: string
}

export interface HelpArticle {
  id: string
  categoryId: string
  title: string
  version: number
  content: Document
  warningMessage?: string
  externalLinks?: HelpExternalLink[]
}

export interface HelpSubcategory {
  id: string
  name: string
  icon?: string
  articles: HelpArticle["id"][]
}

export interface HelpCategory {
  id: string
  name: string
  order: number
  subcategoriesLeftColumn: HelpSubcategory["id"][]
  subcategoriesRightColumn: HelpSubcategory["id"][]
}

export interface HelpAsset {
  id: string
  url: string
}

export interface HelpShortcut {
  categoryId: string
  articleId: string
}

export interface HelpData {
  categories: Record<string, HelpCategory>
  subcategories: Record<string, HelpSubcategory>
  articles: Record<string, HelpArticle>
  assets: Record<string, HelpAsset>
  shortcuts: Record<string, HelpShortcut>
  nextSyncToken: string
}

export interface SerializableRichTextNode {
  nodeType: string
  data: Record<string, unknown>
  content?: SerializableRichTextNode[]
  value?: string
  marks?: unknown[]
}

export interface SerializableDocument extends SerializableRichTextNode {
  nodeType: "document"
  content: SerializableRichTextNode[]
}

export interface SerializableHelpArticle extends Omit<HelpArticle, "content"> {
  content: SerializableDocument
}

export interface SerializableHelpData extends HelpData {
  [key: string]: unknown
}

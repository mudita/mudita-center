/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntryCollection } from "contentful"
import { NewsEntry } from "../../dto"
import { getBase64 } from "../get-base-64/get-base64.helper"
import { getAssetForEntry } from "Core/news/helpers/normalize-contentful-data/get-asset-for-entry.helper"

export const normalizeContentfulData = async (
  data: EntryCollection<NewsEntry>
): Promise<{ newsItems: NewsEntry[]; lastUpdate: string }> => {
  const { items, includes } = data
  const newsItems: NewsEntry[] = []

  for (const item of items) {
    const { fields, sys } = item
    const { title, url } = getAssetForEntry(includes.Asset, fields?.image?.sys?.id);

    const imageSource = await getBase64(url)
    const imageAlt = title
    newsItems.push({
      ...fields,
      newsId: sys.id,
      updatedAt: sys.updatedAt,
      createdAt: sys.createdAt,
      imageId: fields?.image?.sys?.id,
      imageSource,
      imageAlt,
    })
  }

  return {
    newsItems,
    lastUpdate: new Date().toISOString(),
  }
}

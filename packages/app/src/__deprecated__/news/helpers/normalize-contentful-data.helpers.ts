/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Asset, Entry, EntryCollection } from "contentful"
import { NewsEntry } from "App/__deprecated__/news/store/mudita-news.interface"
import { getBase64 } from "./get-base64.helpers"

export const normalizeContentfulData = async (
  data: EntryCollection<NewsEntry>
) => {
  const { items, includes } = data
  const news = items.map(({ fields, sys }: Entry<NewsEntry>) => {
    return {
      ...fields,
      newsId: sys.id,
      updatedAt: sys.updatedAt,
      createdAt: sys.createdAt,
      imageId: fields?.image?.sys?.id,
    }
  })
  for (const item of news) {
    const {
      fields: {
        title,
        file: { url },
      },
    } = includes.Asset.find((asset: Asset) => {
      return item?.image?.sys?.id === asset.sys.id
    })
    item.imageSource = await getBase64(url)
    item.imageAlt = title
  }
  return {
    newsItems: news,
    lastUpdate: new Date().toISOString(),
  }
}

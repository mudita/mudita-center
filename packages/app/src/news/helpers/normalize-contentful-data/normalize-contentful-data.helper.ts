/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Asset, Entry, EntryCollection } from "contentful"
import { NewsEntry } from "App/news/dto"
import { getBase64 } from "../get-base-64/get-base64.helper"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normalizeContentfulData = async (
  data: EntryCollection<NewsEntry>
) => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      fields: {
        title,
        file: { url },
      },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    } = includes.Asset.find((asset: Asset) => {
      return item?.image?.sys?.id === asset.sys.id
    })
    item.imageSource = await getBase64(url)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    item.imageAlt = title
  }
  return {
    newsItems: news,
    lastUpdate: new Date().toISOString(),
  }
}

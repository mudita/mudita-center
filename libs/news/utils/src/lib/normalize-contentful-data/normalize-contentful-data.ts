/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getBase64 } from "../get-base64/get-base64"
import { getAssetForEntry } from "./get-asset-for-entry"
import { NewsData, NewsRawData } from "news/models"

const DPI = 2
export const WIDTH = 273 * DPI
export const HEIGHT = 220 * DPI
const QUALITY = 100

export const normalizeContentfulData = async (
  data: NewsRawData
): Promise<NewsData> => {
  const newsItems = []

  for (const item of data.items) {
    const { fields, sys } = item
    const { title, url: relativeUrl } = getAssetForEntry(
      data,
      fields.image.sys?.id
    )
    const url = `https:${relativeUrl}?w=${WIDTH}&h=${HEIGHT}&fit=fill&q=${QUALITY}`
    const imageSource = await getBase64(url)
    const imageAlt = title
    const { image, ...rest } = fields
    newsItems.push({
      newsId: sys.id,
      updatedAt: sys.updatedAt,
      createdAt: sys.createdAt,
      imageId: fields?.image?.sys?.id,
      imageSource,
      imageAlt,
      category: fields.category,
      ...rest,
    })
  }

  return {
    newsItems,
    lastUpdate: new Date().toISOString(),
  }
}

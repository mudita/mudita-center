/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getBase64 } from "../get-base64/get-base64"
import { getAssetForEntry } from "./get-asset-for-entry"
import { NewsData, NewsItem, NewsRawData } from "news/models"
import { format } from "date-fns"

const DPI = 2
export const WIDTH = 275 * DPI
export const HEIGHT = 220 * DPI
const QUALITY = 95

export const normalizeContentfulData = async (
  data: NewsRawData
): Promise<NewsData> => {
  const newsItems: NewsItem[] = []

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
    const date = sys.updatedAt || sys.createdAt
    newsItems.push({
      newsId: sys.id,
      title: rest.title.trim(),
      description: rest.content.trim(),
      link: rest.link,
      formattedDate: format(new Date(date), "PP"),
      communityLink: rest.communityLink,
      commentsCount: rest.commentsCount ?? 0,
      updatedAt: date,
      imageAlt,
      imageSource,
    })
  }

  return {
    items: newsItems.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }),
  }
}

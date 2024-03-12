/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntryCollection } from "contentful"
import { NewsEntry } from "../../dto"
import { getBase64 } from "../get-base-64/get-base64.helper"
import { getAssetForEntry } from "./get-asset-for-entry.helper"
import {
  CARD_IMAGE_MAX_HEIGHT_PIXEL,
  CARD_IMAGE_MAX_WIDTH_PIXEL,
} from "../../../news/components/card/card.constans"

const DPI = 2
const WIDTH = CARD_IMAGE_MAX_WIDTH_PIXEL * DPI
const HEIGHT = CARD_IMAGE_MAX_HEIGHT_PIXEL * DPI
const QUALITY = 100

export const normalizeContentfulData = async (
  data: EntryCollection<NewsEntry>
): Promise<{ newsItems: NewsEntry[]; lastUpdate: string }> => {
  const { items, includes } = data
  const newsItems: NewsEntry[] = []

  for (const item of items) {
    const { fields, sys } = item
    const { title, url: relativeUrl } = getAssetForEntry(
      includes.Asset,
      fields?.image?.sys?.id
    )
    const url = `https:${relativeUrl}?w=${WIDTH}&h=${HEIGHT}&fit=fill&q=${QUALITY}`
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

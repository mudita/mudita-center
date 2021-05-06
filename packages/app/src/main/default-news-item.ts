/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
const data = require("./default-news.json")
import { EntryCollection } from "contentful"
import { normalizeContentfulData } from "Renderer/models/mudita-news/normalize-contentful-data"
export interface DefaultNewsItems {
  newsItems: NewsEntry[]
}

const getDefaultNewsItems = async (): Promise<DefaultNewsItems> => {
  const newsData = await normalizeContentfulData(
    data as EntryCollection<NewsEntry>
  )
  const { newsItems } = newsData
  return {
    newsItems,
  }
}

export default getDefaultNewsItems

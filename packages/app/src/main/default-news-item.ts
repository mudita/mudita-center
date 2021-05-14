/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const fs = require("fs-extra")
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export interface DefaultNewsItems {
  newsItems: NewsEntry[]
}

const getDefaultNewsItems = async (): Promise<DefaultNewsItems> => {
  let data
  if (fs.access("./default-news.json")) {
    data = require("./default-news.json")
  } else {
    data = { newsItems: [] }
  }
  const { newsItems } = data
  return {
    newsItems,
  }
}

export default getDefaultNewsItems

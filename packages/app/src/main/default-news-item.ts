/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
const data = require("./default-news.json")
export interface DefaultNewsItems {
  newsItems: NewsEntry[]
}

const getDefaultNewsItems = async (): Promise<DefaultNewsItems> => {
  const { newsItems } = data
  return {
    newsItems,
  }
}

export default getDefaultNewsItems

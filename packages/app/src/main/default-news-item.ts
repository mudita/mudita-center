/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const fs = require("fs-extra")
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
const dataFile = "./default-news.json"

export interface DefaultNewsItems {
  newsItems: NewsEntry[]
}

const getDefaultNewsItems = async (): Promise<DefaultNewsItems> => {
  let data = { newsItems: [] }
  if (fs.existsSync(dataFile)) {
    data = require(dataFile)
  }

  const { newsItems } = data
  return {
    newsItems,
  }
}

export default getDefaultNewsItems

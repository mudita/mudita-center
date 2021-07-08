/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export interface DefaultNewsItems {
  newsItems: NewsEntry[]
}

let data: DefaultNewsItems = { newsItems: [] }

try {
  data = require("./default-news.json") as DefaultNewsItems
} catch {}

const getDefaultNewsItems = (): DefaultNewsItems => {
  return data
}

export default getDefaultNewsItems

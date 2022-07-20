/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "App/__deprecated__/api/mudita-center-server/create-client"
import logger from "App/__deprecated__/main/utils/logger"
import { NewsEntry } from "App/news/dto"
import { Entry, EntryCollection } from "contentful"
import fs from "fs-extra"
import { normalizeContentfulData } from "App/news/helpers"

const checkForUpdateAndGetNewData = async (
  newsFilePath: string
): Promise<boolean | EntryCollection<NewsEntry>> => {
  const { newsItems } = await fs.readJson(newsFilePath)
  const newestLocalItemDate = Math.max(
    ...newsItems.map((item: NewsEntry) => {
      return new Date(item.updatedAt).getTime()
    })
  )

  try {
    const client = createClient()
    const data: EntryCollection<NewsEntry> = await client.getNews({
      limit: 6,
    })

    const newestOnlineItemDate = Math.max(
      ...data.items.map((item: Entry<NewsEntry>) => {
        return new Date(item.sys.updatedAt).getTime()
      })
    )
    if (newestOnlineItemDate > newestLocalItemDate) {
      return data
    }

    return false
  } catch (error) {
    logger.error(
      `News: fetch news from mudita-center-server. Data: ${JSON.stringify(
        error
      )}`
    )
    return false
  }
}

export const getUpdatedNews = async (newsFilePath: string) => {
  const updatedNews = await checkForUpdateAndGetNewData(newsFilePath)
  if (updatedNews) {
    const newsData = await normalizeContentfulData(
      updatedNews as EntryCollection<NewsEntry>
    )
    await fs.writeJson(newsFilePath, newsData)
    return newsData
  }
  return null
}

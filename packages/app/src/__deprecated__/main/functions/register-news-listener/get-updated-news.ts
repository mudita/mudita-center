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
import _ from "lodash"

const checkForUpdateAndGetNewData = async (
  newsFilePath: string
): Promise<boolean | EntryCollection<NewsEntry>> => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { newsItems: localNews } = await fs.readJson(newsFilePath)

  try {
    const client = createClient()
    const onlineNews: EntryCollection<NewsEntry> = await client.getNews({
      limit: 6,
    })

    if (shouldUpdateNews(localNews, onlineNews)) {
      return onlineNews
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

const shouldUpdateNews = (
  local: NewsEntry[],
  online: EntryCollection<NewsEntry>
) => {
  return (
    isOnlineNewsNewerUpdateAt(local, online) ||
    isOnlineNewsDifferentFromLocal(local, online)
  )
}

const isOnlineNewsNewerUpdateAt = (
  local: NewsEntry[],
  online: EntryCollection<NewsEntry>
) => {
  const newestLocalItemUpdatedAt = Math.max(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ...local.map((item: NewsEntry) => {
      return new Date(item.updatedAt).getTime()
    })
  )
  const newestOnlineItemUpdatedAt = Math.max(
    ...online.items.map((item: Entry<NewsEntry>) => {
      return new Date(item.sys.updatedAt).getTime()
    })
  )
  return newestOnlineItemUpdatedAt > newestLocalItemUpdatedAt
}

const isOnlineNewsDifferentFromLocal = (
  local: NewsEntry[],
  online: EntryCollection<NewsEntry>
) => {
  const localNewsDates = local.map((item: NewsEntry) => new Date(item.date))
  const onlineNewsDates = online.items.map(
    (item: Entry<NewsEntry>) => new Date(item.fields.date)
  )
  return !_.isEqual(onlineNewsDates, localNewsDates)
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

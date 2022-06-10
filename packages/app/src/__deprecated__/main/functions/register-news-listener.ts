/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app } from "electron"
import packageInfo from "../../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import { EntryCollection } from "contentful"
import getDefaultNewsItems from "App/__deprecated__/main/default-news-item"
import { normalizeContentfulData } from "App/__deprecated__/news/helpers/normalize-contentful-data.helpers"
import { NewsEntry } from "App/__deprecated__/news/store/mudita-news.interface"
import logger from "App/__deprecated__/main/utils/logger"
import { createClient } from "App/__deprecated__/api/mudita-center-server"

export enum NewsEvents {
  Get = "get-news-items",
  Save = "save-news-items",
  Update = "update-news-items",
  Init = "init-news-items",
}

const registerNewsListener = (): void => {
  const newsFilePath = `${app.getPath("appData")}/${
    packageInfo.name
  }/default-news-items.json`

  const checkForUpdateAndGetNewData = async (): Promise<
    boolean | EntryCollection<NewsEntry>
  > => {
    const { newsItems } = await fs.readJson(newsFilePath)
    const newestLocalItemDate = Math.max(
      ...newsItems.map((item: any) => new Date(item.updatedAt).getTime())
    )
    try {
      const client = createClient()
      const data: EntryCollection<NewsEntry> = await client.getNews({
        limit: 6,
      })

      const newestOnlineItemDate = Math.max(
        ...data.items.map((item: any) => new Date(item.sys.updatedAt).getTime())
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

  const getUpdatedNews = async () => {
    const updatedNews = await checkForUpdateAndGetNewData()
    if (updatedNews) {
      const newsData = await normalizeContentfulData(
        updatedNews as EntryCollection<NewsEntry>
      )
      await fs.writeJson(newsFilePath, newsData)
      return newsData
    }
    return null
  }

  if (!fs.readJsonSync(newsFilePath, { throws: false })) {
    const defaultNews = getDefaultNewsItems()
    fs.writeJsonSync(newsFilePath, defaultNews)
  }

  ipcMain.answerRenderer(NewsEvents.Get, () => {
    return fs.readJson(newsFilePath)
  })

  ipcMain.answerRenderer(NewsEvents.Update, getUpdatedNews)

  ipcMain.answerRenderer(NewsEvents.Init, async () => {
    return (await getUpdatedNews()) ?? (await fs.readJson(newsFilePath))
  })
}

export default registerNewsListener

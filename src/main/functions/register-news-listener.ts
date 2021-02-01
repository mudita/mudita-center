import { app } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import getDefaultNewsItems from "App/main/default-news-item"
import { normalizeContentfulData } from "Renderer/models/mudita-news/normalize-contentful-data"
import { EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import logger from "App/main/utils/logger"
import { createClient, ContentfulResource } from "App/api/contentful"

export enum NewsEvents {
  Get = "get-news-items",
  Save = "save-news-items",
  Update = "update-news-items",
  Init = "init-news-items",
}

const registerNewsListener = () => {
  const defaultNews = getDefaultNewsItems()
  const newsFilePath = `${app.getPath(
    "appData"
  )}/${name}/default-news-items.json`
  const checkForUpdateAndGetNewData = async (): Promise<
    boolean | EntryCollection<NewsEntry>
  > => {
    const { newsItems } = await fs.readJson(newsFilePath)
    const newestLocalItemDate = Math.max(
      ...newsItems.map((item: any) => new Date(item.updatedAt).getTime())
    )
    try {
      const client = createClient({ resource: ContentfulResource.News })
      const data: EntryCollection<NewsEntry> = await client.getEntries({
        content_type: "newsItem",
        limit: 3,
      })
      const newestOnlineItemDate = Math.max(
        ...data.items.map((item: any) => new Date(item.sys.updatedAt).getTime())
      )
      if (newestOnlineItemDate > newestLocalItemDate) {
        return data
      }
      return false
    } catch (e) {
      logger.error(e)
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

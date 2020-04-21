import { app } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import getDefaultNewsItems from "App/main/default-news-item"
import axios from "axios"
import { normalizeContentfulData } from "Renderer/models/mudita-news/normalize-contentful-data"

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
  const checkForUpdateAndGetNewData = async () => {
    const { newsItems } = await fs.readJson(newsFilePath)
    const newestLocalItemDate = Math.max(
      ...newsItems.map((item: any) => new Date(item.updatedAt).getTime())
    )
    try {
      const { data } = await axios.get(
        `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem&limit=3`
      )
      const newestOnlineItemDate = Math.max(
        ...data.items.map((item: any) => new Date(item.sys.updatedAt).getTime())
      )
      if (newestOnlineItemDate > newestLocalItemDate) {
        return data
      }
    } catch (e) {
      return false
    }
  }

  const getUpdatedNews = async () => {
    const updatedNews = await checkForUpdateAndGetNewData()
    if (updatedNews) {
      const newsData = await normalizeContentfulData(updatedNews)
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

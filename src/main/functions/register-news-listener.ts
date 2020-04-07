import { app } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import getDefaultNewsItems from "App/main/default-news-item"
import axios from "axios"
import {
  downloadComments,
  normalizeContentfulData,
} from "Renderer/models/mudita-news/download-contentful-and-comments"

require("dotenv").config()
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
        `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`
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

  if (!fs.readJsonSync(newsFilePath, { throws: false })) {
    fs.writeJsonSync(newsFilePath, defaultNews)
  }

  ipcMain.answerRenderer(NewsEvents.Get, () => {
    return fs.readJson(newsFilePath)
  })

  ipcMain.answerRenderer(NewsEvents.Update, async () => {
    const updatedNews = await checkForUpdateAndGetNewData()
    if (updatedNews) {
      const newsData = await normalizeContentfulData(updatedNews)
      const comments = await downloadComments(newsData.newsItems)
      const data = {
        ...newsData,
        ...comments,
      }
      await fs.writeJson(newsFilePath, data)
      return data
    }
    return null
  })

  ipcMain.answerRenderer(NewsEvents.Init, async () => {
    const updatedNews = await checkForUpdateAndGetNewData()
    if (updatedNews) {
      const newsData = await normalizeContentfulData(updatedNews)
      const comments = await downloadComments(newsData.newsItems)
      const data = {
        ...newsData,
        ...comments,
      }
      await fs.writeJson(newsFilePath, data)
      return data
    } else {
      return fs.readJson(newsFilePath)
    }
  })
}

export default registerNewsListener

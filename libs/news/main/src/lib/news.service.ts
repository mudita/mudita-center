/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import fs from "fs-extra"
import path from "path"
import { app } from "electron"
import EventEmitter from "events"
import { NewsData, NewsItem, NewsRawData } from "news/models"
import { normalizeContentfulData } from "news/utils"
import defaultNews from "./default-news.json"
import logger from "electron-log/main"

export class NewsService {
  private readonly eventEmitter = new EventEmitter()

  constructor() {
    void this.downloadNews()
  }

  private get newsFilePath() {
    return path.join(app.getPath("userData"), "news.json")
  }

  public async getNews(): Promise<NewsItem[]> {
    const downloadedNewsExists = await fs.pathExists(this.newsFilePath)
    if (downloadedNewsExists) {
      return (await fs.readJson(this.newsFilePath)) as NewsData
    }
    return defaultNews
  }

  public onNewsUpdate(callback: (data: NewsItem[]) => void) {
    this.eventEmitter.once("news-update", callback)
  }

  private async downloadNews() {
    if (!import.meta.env.VITE_MUDITA_CENTER_SERVER_URL) {
      logger.error(
        "VITE_MUDITA_CENTER_SERVER_URL is not set. News will not be downloaded."
      )
      return
    }
    logger.log("Downloading news")
    try {
      const rawData = await axios.get<NewsRawData>(
        import.meta.env.VITE_MUDITA_CENTER_SERVER_URL + "/news",
        { params: { limit: 6 } }
      )
      const normalizedData = await normalizeContentfulData(rawData.data)
      this.eventEmitter.emit("news-update", normalizedData)
      await this.saveNews(normalizedData)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          "Error while downloading news. Got status",
          error.response?.status,
          "for",
          error.request?.method,
          `${error.request?.protocol}//${error.request?.host}${error.request?.path}`
        )
        return
      }
      if (error instanceof Error) {
        logger.error("Error while downloading news:", error.message)
        return
      }
      logger.error("Error while downloading news:", error)
    }
  }

  private async saveNews(news: NewsData) {
    await fs.ensureDir(path.join(this.newsFilePath, ".."))
    await fs.writeJson(this.newsFilePath, news)
    logger.log("News saved to", "<userData>/news.json")
  }
}

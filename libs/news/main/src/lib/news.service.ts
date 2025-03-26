/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosError } from "axios"
import fs from "fs-extra"
import path from "path"
import { app } from "electron"
import EventEmitter from "events"
import { NewsData, NewsItem, NewsRawData } from "news/models"
import { normalizeContentfulData } from "news/utils"
import defaultNews from "./default-news.json"

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
      const news = (await fs.readJson(this.newsFilePath)) as NewsData
      return news.newsItems
    }
    return defaultNews.newsItems
  }

  public onNewsUpdate(callback: (data: NewsItem[]) => void) {
    this.eventEmitter.on("news-update", callback)
  }

  private async downloadNews() {
    try {
      const rawData = await axios.get<NewsRawData>(
        process.env.MUDITA_CENTER_SERVER_URL + "/news",
        { params: { limit: 6 } }
      )
      const normalizedData = await normalizeContentfulData(rawData.data)
      this.eventEmitter.emit("news-update", normalizedData.newsItems)
      await this.saveNews(normalizedData)
    } catch (error) {
      console.error(
        "Error while downloading news. Status:",
        (error as AxiosError)?.response?.status
      )
    }
  }

  private async saveNews(news: NewsData) {
    await fs.ensureDir(path.join(this.newsFilePath, ".."))
    await fs.writeJson(this.newsFilePath, news)
  }
}

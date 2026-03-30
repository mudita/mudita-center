/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import EventEmitter from "events"
import { NewsData, NewsRawData } from "news/models"
import { normalizeContentfulData } from "news/utils"
import defaultNews from "./default-news.json"
import logger from "electron-log/main"
import { JsonStoreService } from "app-utils/main"

export class NewsService {
  private readonly jsonStore: JsonStoreService<NewsData>
  private readonly eventEmitter = new EventEmitter()

  constructor() {
    void this.downloadNews()
    this.jsonStore = new JsonStoreService<NewsData>("news", defaultNews)
  }

  public getNews() {
    return this.jsonStore.get()
  }

  public onNewsUpdate(callback: (data: NewsData) => void) {
    this.eventEmitter.once("news-update", callback)
  }

  private async downloadNews() {
    if (!import.meta.env.VITE_MUDITA_CENTER_SERVER_URL) {
      logger.error(
        "VITE_MUDITA_CENTER_SERVER_URL is not set. News will not be downloaded."
      )
      return
    }
    try {
      logger.log("Downloading news...")
      const rawData = await axios.get<NewsRawData>(
        import.meta.env.VITE_MUDITA_CENTER_SERVER_URL + "/news",
        { params: { limit: 6 } }
      )
      logger.log("News downloaded successfully.")
      const normalizedData = await normalizeContentfulData(rawData.data)
      this.eventEmitter.emit("news-update", normalizedData)
      await this.saveNews(normalizedData)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          "Error while downloading news. Status",
          error.response?.status
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
    this.jsonStore.set(news)
  }
}

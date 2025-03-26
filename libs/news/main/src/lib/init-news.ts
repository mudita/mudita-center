/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, WebContents } from "electron"
import { NewsIpcEvents } from "news/models"
import { NewsService } from "./news.service"

let newsService: NewsService | null = null

export const initNews = (ipcMain: IpcMain, webContents: WebContents) => {
  if (!newsService) {
    newsService = new NewsService()
    ipcMain.handle(NewsIpcEvents.Get, () => {
      return (newsService as NewsService).getNews()
    })

    newsService.onNewsUpdate((data) => {
      webContents.send(NewsIpcEvents.Refreshed, data)
    })
  }
}

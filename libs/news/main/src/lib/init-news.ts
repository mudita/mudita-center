/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, BrowserWindow } from "electron"
import { NewsIpcEvents } from "news/models"
import { NewsService } from "./news.service"

let newsService: NewsService

export const initNews = (ipcMain: IpcMain, mainWindow: BrowserWindow) => {
  if (!newsService) {
    newsService = new NewsService()
    ipcMain.handle(NewsIpcEvents.Get, () => {
      return newsService.getNews()
    })

    newsService.onNewsUpdate((data) => {
      mainWindow.webContents.send(NewsIpcEvents.Refreshed, data)
    })
  }
}

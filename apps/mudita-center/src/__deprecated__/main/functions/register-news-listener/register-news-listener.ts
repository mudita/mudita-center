/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcNewsEvents } from "App/news/constants"
import getDefaultNewsItems from "App/news/default-news-item"
import { getUpdatedNews } from "App/__deprecated__/main/functions/register-news-listener/get-updated-news"
import { app } from "electron"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import packageInfo from "../../../../../package.json"

const registerNewsListener = (): void => {
  const newsFilePath = `${app.getPath("appData")}/${
    packageInfo.name
  }/default-news-items.json`

  if (!fs.readJsonSync(newsFilePath, { throws: false })) {
    const defaultNews = getDefaultNewsItems()
    fs.writeJsonSync(newsFilePath, defaultNews)
  }

  ipcMain.answerRenderer(IpcNewsEvents.GetCachedNews, async () => {
    return fs.readJson(newsFilePath)
  })

  ipcMain.answerRenderer(IpcNewsEvents.GetUpdatedNews, () => {
    return getUpdatedNews(newsFilePath)
  })
}

export default registerNewsListener

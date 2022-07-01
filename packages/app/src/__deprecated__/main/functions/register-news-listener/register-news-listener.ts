/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getDefaultNewsItems from "App/__deprecated__/main/default-news-item"
import { getUpdatedNews } from "App/__deprecated__/main/functions/register-news-listener/get-updated-news"
import { app } from "electron"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import packageInfo from "../../../../../package.json"

export enum NewsEvents {
  GetUpdatedNews = "get-updated-news",
  GetCachedNews = "get-cached-news",
}

const registerNewsListener = (): void => {
  const newsFilePath = `${app.getPath("appData")}/${
    packageInfo.name
  }/default-news-items.json`

  if (!fs.readJsonSync(newsFilePath, { throws: false })) {
    const defaultNews = getDefaultNewsItems()
    fs.writeJsonSync(newsFilePath, defaultNews)
  }

  ipcMain.answerRenderer(NewsEvents.GetCachedNews, async () => {
    return fs.readJson(newsFilePath)
  })

  ipcMain.answerRenderer(NewsEvents.GetUpdatedNews, () => {
    return getUpdatedNews(newsFilePath)
  })
}

export default registerNewsListener

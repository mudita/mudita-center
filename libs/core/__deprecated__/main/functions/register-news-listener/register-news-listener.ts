/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import { IpcNewsEvents } from "Core/news/constants"
import getDefaultNewsItems from "Core/news/default-news-item"
import { getUpdatedNews } from "Core/__deprecated__/main/functions/register-news-listener/get-updated-news"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"

const registerNewsListener = (): void => {
  const newsFilePath = getAppPath("default-news-items.json")

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

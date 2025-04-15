/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { NewsData, NewsIpcEvents } from "news/models"

export const news = {
  get: (): Promise<NewsData> => {
    return electronAPI.ipcRenderer.invoke(NewsIpcEvents.Get)
  },
  onRefreshed: (callback: (data: NewsData) => void) => {
    electronAPI.ipcRenderer.on(NewsIpcEvents.Refreshed, (_, data) => {
      callback(data)
    })
  },
}

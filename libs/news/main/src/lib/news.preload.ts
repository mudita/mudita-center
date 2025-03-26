/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { NewsIpcEvents, NewsItem } from "news/models"

export const news = {
  get: (): Promise<NewsItem[]> => {
    return electronAPI.ipcRenderer.invoke(NewsIpcEvents.Get)
  },
  onRefreshed: (callback: (data: NewsItem[]) => void) => {
    electronAPI.ipcRenderer.once(NewsIpcEvents.Refreshed, (_, data) => {
      callback(data)
    })
  },
}

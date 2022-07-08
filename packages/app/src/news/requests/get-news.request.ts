/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcNewsEvents } from "App/news/constants"
import { DefaultNewsItems } from "App/news/default-news-item"
import { ipcRenderer } from "electron-better-ipc"

export const getUpdatedNews = (): Promise<DefaultNewsItems | null> => {
  return ipcRenderer.callMain(IpcNewsEvents.GetUpdatedNews)
}

export const getOfflineNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(IpcNewsEvents.GetCachedNews)
}

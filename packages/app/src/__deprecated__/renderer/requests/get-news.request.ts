/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DefaultNewsItems } from "App/__deprecated__/main/default-news-item"
import { NewsEvents } from "App/__deprecated__/main/functions/register-news-listener/register-news-listener"
import { ipcRenderer } from "electron-better-ipc"

export const getUpdatedNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(NewsEvents.GetUpdatedNews)
}

export const getOfflineNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(NewsEvents.GetCachedNews)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { NewsEvents } from "App/main/functions/register-news-listener"
import { DefaultNewsItems } from "App/main/default-news-item"

export const getNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(NewsEvents.Get)
}

export const initNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(NewsEvents.Init)
}

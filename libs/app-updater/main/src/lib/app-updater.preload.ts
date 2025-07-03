/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppUpdaterIpcEvents } from "app-updater/models"

export const appUpdater = {
  check: async (): Promise<
    { version: string; forced: boolean } | { error: true } | null
  > => {
    return electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Check)
  },
  download: () => {
    return electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Download)
  },
  install: async () => {
    await electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Install)
  },
  cancel: async () => {
    await electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Cancel)
  },
  onProgress: (callback: (percent: number) => void) => {
    electronAPI.ipcRenderer.on(
      AppUpdaterIpcEvents.UpdateDownloadProgress,
      (_, percent) => {
        callback(percent)
      }
    )
  },
}

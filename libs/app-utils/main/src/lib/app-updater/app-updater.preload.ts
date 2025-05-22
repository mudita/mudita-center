/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppUpdateEvent, AppUpdaterIpcEvents } from "app-utils/models"

export const appUpdater = {
  checkForUpdates: (): Promise<void> => {
    return electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Check)
  },
  downloadUpdate: (): Promise<void> => {
    return electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Download)
  },
  installUpdate: (): Promise<void> => {
    return electronAPI.ipcRenderer.invoke(AppUpdaterIpcEvents.Install)
  },
  onUpdateEvent: {
    available: (callback: (version: string) => void) =>
      electronAPI.ipcRenderer.on(AppUpdateEvent.Available, (_, version) =>
        callback(version)
      ),
    notAvailable: (callback: () => void) =>
      electronAPI.ipcRenderer.on(AppUpdateEvent.NotAvailable, callback),
    error: (callback: (err: unknown) => void) =>
      electronAPI.ipcRenderer.on(AppUpdateEvent.Error, (_, err) =>
        callback(err)
      ),
    downloaded: (callback: () => void) =>
      electronAPI.ipcRenderer.on(AppUpdateEvent.Downloaded, callback),
  },
}

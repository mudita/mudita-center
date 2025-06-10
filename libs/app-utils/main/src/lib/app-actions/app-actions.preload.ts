/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppActionsIpcEvents, OpenDialogOptionsLite } from "app-utils/models"

export const appActions = {
  close: (): void => {
    void electronAPI.ipcRenderer.invoke(AppActionsIpcEvents.Close)
  },
  openFileDialog: (
    options: OpenDialogOptionsLite
  ): Promise<string | undefined> => {
    return electronAPI.ipcRenderer.invoke(
      AppActionsIpcEvents.OpenDirectoryDialog,
      options
    )
  },
  openLegalWindow: (path: string, title: string): void => {
    void electronAPI.ipcRenderer.invoke(AppActionsIpcEvents.OpenLegalWindow, {
      path,
      title,
    })
  },

  getAppVersion: (): Promise<string> => {
    return electronAPI.ipcRenderer.invoke(AppActionsIpcEvents.GetVersion)
  },
}

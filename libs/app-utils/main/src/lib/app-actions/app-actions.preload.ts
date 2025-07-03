/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppActionsIpcEvents, OpenDialogOptionsLite } from "app-utils/models"
import { AppLegalPathsTitles } from "app-routing/models"

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
  openWindow: (url: string, title?: string) => {
    const pathsTitles = { ...AppLegalPathsTitles }
    const path = url.replace(/^#/m, "")
    const windowTitle =
      title || pathsTitles[path as keyof typeof pathsTitles] || "Mudita Center"

    void electronAPI.ipcRenderer.invoke(AppActionsIpcEvents.OpenWindow, {
      url,
      title: windowTitle,
    })
  },
  getAppVersion: (): Promise<string> => {
    return electronAPI.ipcRenderer.invoke(AppActionsIpcEvents.GetVersion)
  },
}

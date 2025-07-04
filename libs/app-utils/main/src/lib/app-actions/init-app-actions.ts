/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, OpenDialogOptions } from "electron"
import { AppActionsService } from "./app-actions.service"
import { AppActionsIpcEvents } from "app-utils/models"

let appActionsService: AppActionsService

export const initAppActions = (ipcMain: IpcMain) => {
  if (!appActionsService) {
    appActionsService = new AppActionsService()

    ipcMain.removeHandler(AppActionsIpcEvents.Close)
    ipcMain.handle(AppActionsIpcEvents.Close, () => {
      appActionsService.close()
    })

    ipcMain.removeHandler(AppActionsIpcEvents.OpenDirectoryDialog)
    ipcMain.handle(
      AppActionsIpcEvents.OpenDirectoryDialog,
      (_, options: OpenDialogOptions) => {
        return appActionsService.openFileDialog(options)
      }
    )

    ipcMain.removeHandler(AppActionsIpcEvents.OpenWindow)
    ipcMain.handle(
      AppActionsIpcEvents.OpenWindow,
      (_, { url, title }: { url: string; title: string }) => {
        return appActionsService.openWindow(url, title)
      }
    )

    ipcMain.removeHandler(AppActionsIpcEvents.GetVersion)
    ipcMain.handle(AppActionsIpcEvents.GetVersion, () => {
      return appActionsService.getAppVersion()
    })
  }
}

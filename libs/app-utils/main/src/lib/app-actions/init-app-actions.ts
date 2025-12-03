/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, OpenDialogOptions } from "electron"
import { AppActionsIpcEvents } from "app-utils/models"
import { AppActionsService } from "./app-actions.service"
import { ExternalAuthProvidersService } from "../external-auth-providers/external-auth-providers.service"

export const initAppActions = (
  ipcMain: IpcMain,
  appActionsService: AppActionsService
) => {
  ipcMain.removeHandler(AppActionsIpcEvents.Close)
  ipcMain.handle(AppActionsIpcEvents.Close, () => {
    appActionsService.close()
  })

  ipcMain.removeHandler(AppActionsIpcEvents.OpenDirectoryDialog)
  ipcMain.handle(
    AppActionsIpcEvents.OpenDirectoryDialog,
    (event, options: OpenDialogOptions) => {
      const webContentsId = event.sender.id
      return appActionsService.openFileDialog(options, webContentsId)
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

  new ExternalAuthProvidersService()
}

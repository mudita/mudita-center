/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppActionsService } from "./app-actions.service"
import { AppActionsIpcEvents } from "app-utils/models"

let appActionsService: AppActionsService | null = null

export const initAppActions = (ipcMain: IpcMain) => {
  if (!appActionsService) {
    appActionsService = new AppActionsService()
    ipcMain.handle(AppActionsIpcEvents.Close, () => {
      ;(appActionsService as AppActionsService).close()
    })
  }
}

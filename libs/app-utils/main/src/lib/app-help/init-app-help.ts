/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppHelpService } from "./app-help.service"
import { HelpIpcEvents } from "app-utils/models"

let helpService: AppHelpService | null = null

export const initAppHelp = (ipcMain: IpcMain) => {
  if (!helpService) {
    helpService = new AppHelpService()
    void helpService.initialize()
  }

  ipcMain.handle(HelpIpcEvents.GetData, () => {
    return helpService!.getData()
  })
}

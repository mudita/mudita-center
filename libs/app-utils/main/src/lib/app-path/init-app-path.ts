/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppPath } from "app-utils/models"
import { AppPathService } from "./app-path.service"

export const initAppPath = (ipcMain: IpcMain) => {
  ipcMain.removeHandler(AppPath.Join)
  ipcMain.handle(AppPath.Join, (_, ...segments: string[]) => {
    return AppPathService.join(...segments)
  })
}

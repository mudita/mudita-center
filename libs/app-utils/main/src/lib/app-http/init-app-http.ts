/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppHttpService } from "./app-http.service"
import { AppHttpIpcEvents, AppHttpRequestConfig } from "app-utils/models"

export const initAppHttp = (ipcMain: IpcMain) => {
  ipcMain.removeHandler(AppHttpIpcEvents.Request)
  ipcMain.handle(
    AppHttpIpcEvents.Request,
    (_, config: AppHttpRequestConfig) => {
      return AppHttpService.request(config)
    }
  )
}

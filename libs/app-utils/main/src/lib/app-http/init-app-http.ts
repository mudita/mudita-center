/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppHttpService } from "./app-http.service"
import { AppHttpIpcEvents, AppHttpRequestConfig } from "app-utils/models"

let appHttpService: AppHttpService

export const initAppHttp = (ipcMain: IpcMain) => {
  if (!appHttpService) {
    appHttpService = new AppHttpService()

    ipcMain.handle(
      AppHttpIpcEvents.Request,
      (_, config: AppHttpRequestConfig) => {
        return appHttpService.request(config)
      }
    )
  }
}

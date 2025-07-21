/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { IpcMockServer } from "e2e-mock/server"
import { AppHttpService } from "./app-http.service"
import { AppHttpIpcEvents, AppHttpRequestConfig } from "app-utils/models"
import { MockAppHttpService } from "./mock-app-http.service"

let appHttpService: AppHttpService | MockAppHttpService

export const initAppHttp = (ipcMain: IpcMain, mockServer: IpcMockServer) => {
  if (!appHttpService) {
    console.log(
      `Initializing App Http Service in ${mockServer.serverEnabled ? "mock" : "real"} mode`
    )
    appHttpService = mockServer.serverEnabled
      ? new MockAppHttpService(mockServer)
      : new AppHttpService()

    ipcMain.removeHandler(AppHttpIpcEvents.Request)
    ipcMain.handle(
      AppHttpIpcEvents.Request,
      (_, config: AppHttpRequestConfig) => {
        return appHttpService.request(config)
      }
    )
  }
}

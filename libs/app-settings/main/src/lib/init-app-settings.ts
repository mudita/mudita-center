/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { IpcMockServer } from "e2e-mock/server"
import { DotNotation, NestedPartial } from "app-utils/models"
import { delay } from "app-utils/common"
import { AppSettings, AppSettingsIpcEvents } from "app-settings/models"
import { AppSettingsService } from "./app-settings.service"

let appSettingsService: AppSettingsService

const getService = () => {
  if (!appSettingsService) {
    appSettingsService = new AppSettingsService()
  }
  return appSettingsService
}

export const initAppSettings = (
  ipcMain: IpcMain,
  mockServer: IpcMockServer
) => {
  if (!appSettingsService) {
    ipcMain.removeHandler(AppSettingsIpcEvents.Get)
    ipcMain.handle(
      AppSettingsIpcEvents.Get,
      async (_, path?: DotNotation<AppSettings>) => {
        if (mockServer.serverEnabled) {
          await delay(1000)
        }
        return getService().get(path)
      }
    )

    ipcMain.removeHandler(AppSettingsIpcEvents.Set)
    ipcMain.handle(
      AppSettingsIpcEvents.Set,
      async (_, settings: NestedPartial<AppSettings>) => {
        return getService().set(settings)
      }
    )
  }
}

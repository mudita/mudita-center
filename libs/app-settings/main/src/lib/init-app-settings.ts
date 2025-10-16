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

const DEFAULT_DELAY_MS = 2500
let appSettingsService: AppSettingsService

const getService = async (serverEnabled: boolean) => {
  if (!appSettingsService) {
    if (serverEnabled) {
      await delay(DEFAULT_DELAY_MS)
    }
    appSettingsService = new AppSettingsService()
  }
  return appSettingsService
}

export const getAppSettingsService = () => {
  return appSettingsService
}

export const initAppSettings = (
  ipcMain: IpcMain,
  mockServer: IpcMockServer
) => {
  ipcMain.removeHandler(AppSettingsIpcEvents.Get)
  ipcMain.handle(
    AppSettingsIpcEvents.Get,
    async (_, path?: DotNotation<AppSettings>) => {
      const service = await getService(mockServer.serverEnabled)
      return path ? service.get(path) : service.get()
    }
  )

  ipcMain.removeHandler(AppSettingsIpcEvents.Set)
  ipcMain.handle(
    AppSettingsIpcEvents.Set,
    async (_, settings: NestedPartial<AppSettings>) => {
      const service = await getService(mockServer.serverEnabled)
      return service.set(settings)
    }
  )
}

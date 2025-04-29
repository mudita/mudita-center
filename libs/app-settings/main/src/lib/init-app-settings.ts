/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppSettingsService } from "./app-settings.service"
import { AppSettings, AppSettingsIpcEvents } from "app-settings/models"
import { DotNotation, NestedPartial } from "app-utils/models"

let appSettingsService: AppSettingsService | null = null

export const initAppSettings = (ipcMain: IpcMain) => {
  if (!appSettingsService) {
    appSettingsService = new AppSettingsService()

    ipcMain.removeHandler(AppSettingsIpcEvents.Get)
    ipcMain.handle(
      AppSettingsIpcEvents.Get,
      async (_, path?: DotNotation<AppSettings>) => {
        return (appSettingsService as AppSettingsService).get(path)
      }
    )

    ipcMain.removeHandler(AppSettingsIpcEvents.Set)
    ipcMain.handle(
      AppSettingsIpcEvents.Set,
      async (_, settings: NestedPartial<AppSettings>) => {
        return (appSettingsService as AppSettingsService).set(settings)
      }
    )
  }
}

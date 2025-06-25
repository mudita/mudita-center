/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppSettings, AppSettingsIpcEvents } from "app-settings/models"
import { DotNotation, DotValue, NestedPartial } from "app-utils/models"

interface AppSettingsMethods {
  get(): Promise<AppSettings>
  get<P extends DotNotation<AppSettings>>(
    path: P
  ): Promise<DotValue<AppSettings, P>>

  set(settings: NestedPartial<AppSettings>): Promise<AppSettings>
}

export const appSettings = {
  get: (path) => {
    return electronAPI.ipcRenderer.invoke(AppSettingsIpcEvents.Get, path)
  },
  set: (data) => {
    return electronAPI.ipcRenderer.invoke(AppSettingsIpcEvents.Set, data)
  },
} as AppSettingsMethods

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppSettings, AppSettingsIpcEvents } from "app-settings/models"
import { NestedPartial } from "app-utils/models"

export const appSettings = {
  get: (): Promise<AppSettings> => {
    return electronAPI.ipcRenderer.invoke(AppSettingsIpcEvents.Get)
  },
  set: (data: NestedPartial<AppSettings>): Promise<AppSettings> => {
    return electronAPI.ipcRenderer.invoke(AppSettingsIpcEvents.Set, data)
  },
}

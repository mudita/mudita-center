/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import { IpcAppSettingsRequest } from "App/app-settings/constants"

export const getAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcAppSettingsRequest.Get)

export const updateAppSettings = (
  option: SettingsUpdateOption
): Promise<Partial<AppSettings>> =>
  ipcRenderer.callMain(IpcAppSettingsRequest.Update, option)

export const resetAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcAppSettingsRequest.Reset)

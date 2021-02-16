/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

export const getAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcRequest.GetAppSettings)

export const updateAppSettings = (
  option: SettingsUpdateOption
): Promise<Partial<AppSettings>> =>
  ipcRenderer.callMain(IpcRequest.UpdateAppSettings, option)

export const resetAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcRequest.ResetAppSettings)

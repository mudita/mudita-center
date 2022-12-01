/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { Settings, SettingsUpdateOption } from "App/settings/dto"
import { IpcSettingsRequest } from "App/settings/constants"

export const updateSettings = (
  option: SettingsUpdateOption
): Promise<Partial<Settings>> =>
  ipcRenderer.callMain(IpcSettingsRequest.Update, option)

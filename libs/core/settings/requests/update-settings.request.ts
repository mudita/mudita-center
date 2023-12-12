/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { Settings, SettingsUpdateOption } from "Core/settings/dto"
import { IpcSettingsEvent } from "Core/settings/constants"

export const updateSettings = (
  option: SettingsUpdateOption
): Promise<Partial<Settings>> =>
  ipcRenderer.callMain(IpcSettingsEvent.Update, option)

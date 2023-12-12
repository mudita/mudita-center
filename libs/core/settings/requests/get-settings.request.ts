/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { Settings } from "Core/settings/dto"
import { IpcSettingsEvent } from "Core/settings/constants"

export const getSettings = (): Promise<Settings> =>
  ipcRenderer.callMain(IpcSettingsEvent.Get)

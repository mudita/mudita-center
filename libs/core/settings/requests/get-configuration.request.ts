/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { Configuration } from "Core/settings/dto"
import { IpcConfigurationsEvent } from "Core/settings/constants"

export const getConfiguration = (): Promise<Configuration> =>
  ipcRenderer.callMain(IpcConfigurationsEvent.Get)

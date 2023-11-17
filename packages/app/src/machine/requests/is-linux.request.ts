/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMachineEvent } from "App/machine/machine.constants"

export const isLinux = (): Promise<boolean> => {
  return ipcRenderer.callMain(IpcMachineEvent.IsLinux)
}

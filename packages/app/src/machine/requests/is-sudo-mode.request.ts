/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMachineEvent } from "App/machine/machine.constants"

export const isSudoMode = (): Promise<boolean> => {
  return ipcRenderer.callMain(IpcMachineEvent.IsSudoMode)
}

// windows/macos - nothing
// linux
// - check if sudo - if yes show message
// - if not, check if added to group
// - if in group that's fine
// - if not in group show message and procede with flow

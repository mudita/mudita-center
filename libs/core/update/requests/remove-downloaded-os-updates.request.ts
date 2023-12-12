/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDeviceUpdateEvent } from "Core/update/constants"

export const removeDownloadedOsUpdates = (): Promise<void> => {
  return ipcRenderer.callMain(IpcDeviceUpdateEvent.RemoveDownloadedOsUpdates)
}

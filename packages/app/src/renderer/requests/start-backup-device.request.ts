/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

export interface StartBackupDeviceData {
  id: string
}

const startBackupDeviceRequest = async (): Promise<
  DeviceResponse<StartBackupDeviceData>
> => {
  return await ipcRenderer.callMain("")
}

export default startBackupDeviceRequest

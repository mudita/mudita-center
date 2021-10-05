/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

export enum GetBackupDeviceStatusDataState {
  running = "running",
  error = "error",
  finished = "finished",
}

export interface GetBackupDeviceStatusData {
  state: GetBackupDeviceStatusDataState
}

const getBackupDeviceStatus = async (): Promise<
  DeviceResponse<GetBackupDeviceStatusData>
> => {
  return await ipcRenderer.callMain("")
}

export default getBackupDeviceStatus

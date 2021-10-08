/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import {
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
} from "@mudita/pure"

const getBackupDeviceStatus = async (
  config: GetBackupDeviceStatusRequestConfigBody
): Promise<DeviceResponse<GetBackupDeviceStatusResponseBody>> => {
  return await ipcRenderer.callMain(IpcRequest.GetBackupDeviceStatus, config)
}

export default getBackupDeviceStatus

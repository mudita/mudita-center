/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import {
  GetRestoreDeviceStatusRequestConfigBody,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"

const getRestoreDeviceStatus = async (
  config: GetRestoreDeviceStatusRequestConfigBody
): Promise<DeviceResponse<GetRestoreDeviceStatusResponseBody>> => {
  return await ipcRenderer.callMain(IpcRequest.GetRestoreDeviceStatus, config)
}

export default getRestoreDeviceStatus

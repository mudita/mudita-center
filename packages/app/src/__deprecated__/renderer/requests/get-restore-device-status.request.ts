/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import {
  GetRestoreDeviceStatusRequestConfig,
  GetRestoreDeviceStatusResponseBody,
} from "App/device/types/mudita-os"
import { RequestResponse } from "App/core/types/request-response.interface"

const getRestoreDeviceStatus = async (
  config: GetRestoreDeviceStatusRequestConfig["body"]
): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>> => {
  return await ipcRenderer.callMain(IpcRequest.GetRestoreDeviceStatus, config)
}

export default getRestoreDeviceStatus

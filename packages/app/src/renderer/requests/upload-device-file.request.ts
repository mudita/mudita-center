/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  DeviceFile,
  UploadFilePayload,
} from "Backend/device-file-system-service/device-file-system-service"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const uploadDeviceFile = async (
  payload: UploadFilePayload
): Promise<DeviceResponse<DeviceFile>> => {
  return await ipcRenderer.callMain(IpcRequest.UploadDeviceFile, payload)
}

export default uploadDeviceFile

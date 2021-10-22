/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { UploadFileUIPayload } from "Backend/requests/upload-device-file/upload-device-file.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const uploadDeviceFile = async (
  payload: UploadFileUIPayload
): Promise<DeviceResponse<DeviceResponse>> => {
  return await ipcRenderer.callMain(IpcRequest.UploadDeviceFile, payload)
}

export default uploadDeviceFile

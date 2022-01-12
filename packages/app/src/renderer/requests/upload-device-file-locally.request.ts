/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  DeviceFile,
  UploadFileLocallyPayload,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const uploadDeviceFileLocally = async (
  payload: UploadFileLocallyPayload
): Promise<DeviceResponse<DeviceFile>> => {
  return await ipcRenderer.callMain(IpcRequest.UploadDeviceFileLocally, payload)
}

export default uploadDeviceFileLocally

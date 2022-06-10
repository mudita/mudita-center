/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  DeviceFile,
  UploadFileLocallyPayload,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { IpcDeviceFileSystem } from "App/device-file-system"
import { RequestResponse } from "App/core/types/request-response.interface"

const uploadDeviceFileLocally = async (
  payload: UploadFileLocallyPayload
): Promise<RequestResponse<DeviceFile>> => {
  return await ipcRenderer.callMain(
    IpcDeviceFileSystem.UploadDeviceFileLocally,
    payload
  )
}

export default uploadDeviceFileLocally

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const downloadDeviceFile = async (
  filePath: string
): Promise<DeviceResponse<DeviceFile>> => {
  return await ipcRenderer.callMain(IpcRequest.DownloadDeviceFile, filePath)
}

export default downloadDeviceFile

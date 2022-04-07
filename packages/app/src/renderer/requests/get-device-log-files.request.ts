/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import { DeviceFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

const getDeviceLogFiles = async (
  option?: DeviceFilesOption
): Promise<RequestResponse<DeviceFile[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetDeviceLogFiles, option)
}

export default getDeviceLogFiles

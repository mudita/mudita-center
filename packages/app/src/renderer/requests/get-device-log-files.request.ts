/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  DeviceFile,
  DeviceLogFilesOption,
} from "Backend/adapters/pure-phone/pure-phone-adapter.class"

const getDeviceLogFiles = async (
  option?: DeviceLogFilesOption
): Promise<DeviceResponse<DeviceFile[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetDeviceLogFiles, option)
}

export default getDeviceLogFiles

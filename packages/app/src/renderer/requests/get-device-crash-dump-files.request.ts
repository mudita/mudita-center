/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"

const getDeviceCrashDumpFiles = async (
  option?: DeviceFilesOption
): Promise<DeviceResponse<DeviceFileDeprecated[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetDeviceCrashDumpFiles, option)
}

export default getDeviceCrashDumpFiles

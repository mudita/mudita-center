/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceInfo from "Core/__deprecated__/common/interfaces/device-info.interface"
import { IpcRequest } from "Core/__deprecated__/common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "Core/core/types/request-response.interface"

const getDeviceInfo = (): Promise<RequestResponse<DeviceInfo>> => {
  return ipcRenderer.callMain(IpcRequest.GetDeviceInfo)
}

export default getDeviceInfo

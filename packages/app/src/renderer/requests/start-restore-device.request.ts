/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartRestoreRequestConfigBody } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const startRestoreDeviceRequest = async (
  config: StartRestoreRequestConfigBody
): Promise<DeviceResponse> => {
  return await ipcRenderer.callMain(IpcRequest.StartRestoreDevice, config)
}

export default startRestoreDeviceRequest

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartRestoreRequestConfig } from "Core/device/types/mudita-os"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Core/__deprecated__/common/requests/ipc-request.enum"
import { RequestResponse } from "Core/core/types/request-response.interface"

const startRestoreDeviceRequest = async (
  config: StartRestoreRequestConfig["body"]
): Promise<RequestResponse> => {
  return await ipcRenderer.callMain(IpcRequest.StartRestoreDevice, config)
}

export default startRestoreDeviceRequest

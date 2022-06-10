/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartRestoreRequestConfigBody } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const startRestoreDeviceRequest = async (
  config: StartRestoreRequestConfigBody
): Promise<RequestResponse> => {
  return await ipcRenderer.callMain(IpcRequest.StartRestoreDevice, config)
}

export default startRestoreDeviceRequest

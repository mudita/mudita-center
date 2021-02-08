/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const updateOs = (
  updateFilePath: string,
  progressChannel: string
): Promise<DeviceResponse> => {
  return ipcRenderer.callMain(IpcRequest.UpdateOs, {
    updateFilePath,
    progressChannel,
  })
}

export default updateOs

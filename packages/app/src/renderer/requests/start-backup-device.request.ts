/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartBackupResponseBody } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const startBackupDeviceRequest = async (): Promise<
  DeviceResponse<StartBackupResponseBody>
> => {
  return await ipcRenderer.callMain(IpcRequest.StartBackupDevice)
}

export default startBackupDeviceRequest

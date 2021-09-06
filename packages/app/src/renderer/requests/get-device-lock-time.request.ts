/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { GetPhoneLockTimeResponseBody } from "@mudita/pure"

const getDeviceLockTime = (): Promise<DeviceResponse<GetPhoneLockTimeResponseBody>> =>
  ipcRenderer.callMain(IpcRequest.GetDeviceLockTime)

export default getDeviceLockTime

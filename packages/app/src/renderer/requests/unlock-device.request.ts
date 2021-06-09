/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const unlockDevice = (code: number[]): Promise<DeviceResponse> =>
  ipcRenderer.callMain(IpcRequest.UnlockDevice, { code })

export default unlockDevice

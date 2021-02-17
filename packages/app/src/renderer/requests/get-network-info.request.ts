/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import NetworkInfo from "Common/interfaces/network-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getNetworkInfo = (): Promise<DeviceResponse<NetworkInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetNetworkInfo)

export default getNetworkInfo

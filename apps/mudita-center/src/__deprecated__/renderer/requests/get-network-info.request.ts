/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NetworkInfo from "App/__deprecated__/common/interfaces/network-info.interface"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "App/core/types/request-response.interface"

const getNetworkInfo = (): Promise<RequestResponse<NetworkInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetNetworkInfo)

export default getNetworkInfo

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Thread } from "App/messages/reducers/messages.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getThreads = async (): Promise<DeviceResponse<Thread[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetThreads)
}

export default getThreads

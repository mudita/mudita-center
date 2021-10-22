/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { GetThreadsResponse } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getThreads = async (
  pagination: PaginationBody
): Promise<DeviceResponse<GetThreadsResponse>> => {
  return ipcRenderer.callMain(IpcRequest.GetThreads, pagination)
}

export default getThreads

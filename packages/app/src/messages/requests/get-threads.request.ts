/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcThreadRequest } from "App/messages/constants/controller.constant"
import { RequestResponse } from "App/core/types/request-response.interface"
import { GetThreadsResponse } from "App/messages/services"

export const getThreadsRequest = async (
  pagination: PaginationBody
): Promise<RequestResponse<GetThreadsResponse>> => {
  return ipcRenderer.callMain(IpcThreadRequest.GetThreads, pagination)
}

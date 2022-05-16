/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcThreadRequest } from "App/messages/constants/controller.constant"
import { RequestResponse } from "App/core/types/request-response.interface"

export const deleteThreadsRequest = async (
  threadIds: string[]
): Promise<RequestResponse<string[]>> => {
  return await ipcRenderer.callMain(IpcThreadRequest.DeleteThreads, threadIds)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcThreadEvent } from "Core/messages/constants/controller.constant"
import { RequestResponse } from "Core/core/types/request-response.interface"

export const deleteThreadsRequest = async (
  threadIds: string[]
): Promise<RequestResponse<string[]>> => {
  return await ipcRenderer.callMain(IpcThreadEvent.DeleteThreads, threadIds)
}

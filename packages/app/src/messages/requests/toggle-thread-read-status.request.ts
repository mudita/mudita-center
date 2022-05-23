/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcThreadRequest } from "App/messages/constants/controller.constant"
import { RequestResponse } from "App/core/types/request-response.interface"
import { Thread } from "App/messages/reducers/messages.interface"

export const toggleThreadReadStatusRequest = async (
  threads: Thread[]
): Promise<RequestResponse<Thread[]>> => {
  console.log("threadIds request", threads)
  return await ipcRenderer.callMain(
    IpcThreadRequest.ToggleThreadReadStatus,
    threads
  )
}

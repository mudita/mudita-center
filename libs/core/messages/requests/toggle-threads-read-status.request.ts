/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcThreadEvent } from "Core/messages/constants/controller.constant"
import { RequestResponse } from "Core/core/types/request-response.interface"
import { Thread } from "Core/messages/dto"

export const toggleThreadsReadStatusRequest = async (
  threads: Thread[]
): Promise<RequestResponse<Thread[]>> => {
  return await ipcRenderer.callMain(
    IpcThreadEvent.ToggleThreadsReadStatus,
    threads
  )
}

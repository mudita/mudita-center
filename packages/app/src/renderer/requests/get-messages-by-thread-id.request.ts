/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Message } from "App/messages/store/messages.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getMessagesByThreadId = async (
  threadId: string
): Promise<DeviceResponse<Message[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetMessagesByThreadId, threadId)
}

export default getMessagesByThreadId

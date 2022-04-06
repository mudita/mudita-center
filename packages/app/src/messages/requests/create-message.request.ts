/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMessageRequest } from "App/messages/constants/controller.constant"
import { Message, NewMessage } from "App/messages/reducers/messages.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

export const createMessageRequest = (
  newMessage: NewMessage
): Promise<RequestResponse<Message>> => {
  return ipcRenderer.callMain(IpcMessageRequest.CreateMessage, newMessage)
}

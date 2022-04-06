/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Message, NewMessage } from "App/messages/reducers/messages.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

const addMessage = (
  newMessage: NewMessage
): Promise<RequestResponse<Message>> => {
  return ipcRenderer.callMain(IpcRequest.AddMessage, newMessage)
}

export default addMessage

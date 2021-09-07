/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { NewMessage } from "App/messages/store/messages.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const addMessage = (
  newMessage: NewMessage
): Promise<DeviceResponse<NewMessage>> => {
  return ipcRenderer.callMain(IpcRequest.AddMessage, newMessage)
}

export default addMessage

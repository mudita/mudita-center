/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcMessageRequest } from "App/messages/constants/controller.constant"
import { Message } from "App/messages/dto"

export const updateMessageRequest = (
  message: Message
): Promise<ResultObject<unknown>> => {
  return ipcRenderer.callMain(IpcMessageRequest.UpdateMessage, message)
}

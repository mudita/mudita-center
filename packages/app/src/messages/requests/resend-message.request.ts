/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "App/core/types/request-response.interface"
import { IpcMessageRequest } from "App/messages/constants/controller.constant"
import { CreateMessageDataResponse } from "App/messages/services"

export const resendMessageRequest = (
  messageId: string
): Promise<RequestResponse<CreateMessageDataResponse>> => {
  return ipcRenderer.callMain(IpcMessageRequest.ResendMessage, messageId)
}

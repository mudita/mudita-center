/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMessageRequest } from "App/messages/constants/controller.constant"
import { RequestResponse } from "App/core/types/request-response.interface"
import { GetMessagesBody, GetMessagesByThreadIdResponse } from "App/messages/services"

export const getMessagesByThreadIdRequest = async (
  body: GetMessagesBody
): Promise<RequestResponse<GetMessagesByThreadIdResponse>> => {
  return ipcRenderer.callMain(IpcMessageRequest.GetMessagesByThreadId, body)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponse } from "App/core/types/request-response.interface"
import { IpcMessageRequest } from "App/messages/constants/controller.constant"
import { ipcRenderer } from "electron-better-ipc"

export const deleteMessageRequest = (
  messageId: string
): Promise<RequestResponse<undefined>> => {
  return ipcRenderer.callMain(IpcMessageRequest.DeleteMessage, messageId)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponse } from "Core/core/types/request-response.interface"
import { IpcMessageEvent } from "Core/messages/constants/controller.constant"
import { ipcRenderer } from "electron-better-ipc"

export const deleteMessageRequest = (
  messageId: string
): Promise<RequestResponse<undefined>> => {
  return ipcRenderer.callMain(IpcMessageEvent.DeleteMessage, messageId)
}

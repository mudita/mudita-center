/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcTemplateRequest } from "App/templates/constants"
import { Template } from "App/templates/dto"
import { UpdateTemplateOrderRequestResponse } from "App/templates/reducers"

export const updateTemplateOrderRequest = async (
  templates: Template[]
): Promise<UpdateTemplateOrderRequestResponse> => {
  return await ipcRenderer.callMain(
    IpcTemplateRequest.UpdateTemplateOrder,
    templates
  )
}

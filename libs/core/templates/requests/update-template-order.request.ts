/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcTemplateEvent } from "Core/templates/constants"
import { Template } from "Core/templates/dto"
import { UpdateTemplateOrderRequestResponse } from "Core/templates/reducers"

export const updateTemplateOrderRequest = async (
  templates: Template[]
): Promise<UpdateTemplateOrderRequestResponse> => {
  return await ipcRenderer.callMain(
    IpcTemplateEvent.UpdateTemplateOrder,
    templates
  )
}

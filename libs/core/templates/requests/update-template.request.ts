/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcTemplateEvent } from "Core/templates/constants"
import { Template } from "Core/templates/dto"
import { RequestResponse } from "Core/core/types/request-response.interface"

export const updateTemplateRequest = async (
  template: Template
): Promise<RequestResponse<Template>> => {
  return ipcRenderer.callMain(IpcTemplateEvent.UpdateTemplate, template)
}

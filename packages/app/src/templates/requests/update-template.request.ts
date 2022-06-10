/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcTemplateRequest } from "App/templates/constants"
import { Template } from "App/templates/dto"
import { RequestResponse } from "App/core/types/request-response.interface"

export const updateTemplateRequest = async (
  template: Template
): Promise<RequestResponse<Template>> => {
  return ipcRenderer.callMain(IpcTemplateRequest.UpdateTemplate, template)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcTemplateRequest } from "App/templates/constants"
import { RequestResponse } from "App/core/types/request-response.interface"

export const deleteTemplatesRequest = async (
  templateIds: string[]
): Promise<RequestResponse<string[]>> => {
  return await ipcRenderer.callMain(
    IpcTemplateRequest.DeleteTemplates,
    templateIds
  )
}

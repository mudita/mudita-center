/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcTemplateEvent } from "Core/templates/constants"
import { DeleteTemplateRequestResponse } from "Core/templates/reducers"

export const deleteTemplatesRequest = async (
  templateIds: string[]
): Promise<DeleteTemplateRequestResponse> => {
  return await ipcRenderer.callMain(
    IpcTemplateEvent.DeleteTemplates,
    templateIds
  )
}

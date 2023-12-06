/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcFilesManagerEvent } from "Core/files-manager/constants"
import { UploadFilesInput } from "Core/files-manager/dto"

export const uploadFilesRequest = async (
  input: UploadFilesInput
): Promise<ResultObject<string | undefined>> => {
  return ipcRenderer.callMain(IpcFilesManagerEvent.UploadFiles, input)
}

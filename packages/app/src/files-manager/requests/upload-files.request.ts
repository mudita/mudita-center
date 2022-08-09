/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcFilesManagerRequest } from "App/files-manager/constants"
import { UploadFileInput } from "App/files-manager/dto"

export const uploadFilesRequest = async (
  props: UploadFileInput
): Promise<ResultObject<string[] | undefined>> => {
  return ipcRenderer.callMain(IpcFilesManagerRequest.UploadFiles, props)
}

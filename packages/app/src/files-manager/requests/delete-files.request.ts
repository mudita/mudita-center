/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcFilesManagerRequest } from "App/files-manager/constants"

export const deleteFilesRequest = async (
  paths: string[]
): Promise<ResultObject<string[] | undefined>> => {
  return ipcRenderer.callMain(IpcFilesManagerRequest.DeleteFiles, paths)
}

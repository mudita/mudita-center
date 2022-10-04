/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcDialogFileSystemRequest } from "App/file-system/constants"
import { GetPathsInput } from "App/file-system/dto"

export const getPathsRequest = async (
  props: GetPathsInput
): Promise<ResultObject<string[] | undefined>> => {
  return ipcRenderer.callMain(IpcDialogFileSystemRequest.GetPaths, props)
}

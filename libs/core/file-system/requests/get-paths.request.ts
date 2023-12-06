/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDialogFileSystemEvent } from "Core/file-system/constants"
import { GetPathsInput } from "Core/file-system/dto"

export const getPathsRequest = async (
  props: GetPathsInput
): Promise<ResultObject<string[] | undefined>> => {
  return ipcRenderer.callMain(IpcDialogFileSystemEvent.GetPaths, props)
}

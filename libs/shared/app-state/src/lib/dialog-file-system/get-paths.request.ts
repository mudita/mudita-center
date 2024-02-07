/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OpenDialogOptions } from "electron"
import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcFileSystemDialogEvent } from "./controller.constant"

export const getPathsRequest = async (
  options: OpenDialogOptions
): Promise<ResultObject<string[] | undefined>> => {
  return ipcRenderer.callMain(IpcFileSystemDialogEvent.GetPaths, options)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcFileSystemDialogEvent } from "./controller.constant"
import { GetPathsInput } from "./get-paths-input.object"

export const getPathsRequest = async (
  input: GetPathsInput
): Promise<ResultObject<string[] | undefined>> => {
  return ipcRenderer.callMain(IpcFileSystemDialogEvent.GetPaths, input)
}

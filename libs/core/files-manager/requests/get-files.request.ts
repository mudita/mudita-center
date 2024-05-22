/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcFilesManagerEvent } from "Core/files-manager/constants"
import { File, GetFilesInput } from "Core/files-manager/dto"

export const getFilesRequest = async (
  input: GetFilesInput
): Promise<ResultObject<File[] | undefined>> => {
  return ipcRenderer.callMain(IpcFilesManagerEvent.GetFiles, input)
}

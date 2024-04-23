/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { OpenDialogOptions } from "electron"
import { FileDialogServiceEvents } from "system-utils/models"

export const selectSingleFileRequest = (
  options: Omit<OpenDialogOptions, "properties">
): Promise<ResultObject<string>> => {
  return ipcRenderer.callMain(FileDialogServiceEvents.SelectSingleFile, {
    options,
  })
}

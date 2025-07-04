/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { OpenDialogOptions } from "electron"
import { FileDialogToMainEvents } from "system-utils/models"
import { ResultObject } from "Core/core/builder"

export const chooseDirectoryRequest = (
  options: OpenDialogOptions
): Promise<ResultObject<string>> => {
  return ipcRenderer.callMain(FileDialogToMainEvents.ChooseDirectory, {
    options,
  })
}

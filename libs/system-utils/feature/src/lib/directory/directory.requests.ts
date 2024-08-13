/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject, SuccessResult } from "Core/core/builder"
import { DirectoryServiceEvents } from "system-utils/models"
import type { AppPathType, CheckPathResult } from "./directory.service"

export const getAppPath = (
  type: AppPathType
): Promise<SuccessResult<string>> => {
  return ipcRenderer.callMain(DirectoryServiceEvents.GetAppPath, type)
}

export const checkPath = async <E extends boolean>(
  path: string,
  ensureExists?: E
): Promise<SuccessResult<CheckPathResult<E>>> => {
  return ipcRenderer.callMain(DirectoryServiceEvents.CheckPath, {
    path,
    ensureExists,
  })
}

export const removeDirectory = async (
  path: string
): Promise<ResultObject<void>> => {
  return ipcRenderer.callMain(DirectoryServiceEvents.RemoveDirectory, path)
}

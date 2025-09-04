/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemIpcEvents,
  AppFileSystemMkdirOptions,
  AppFileSystemRmOptions,
  AppResult,
} from "app-utils/models"

export const appFileSystem = {
  rm: (options: AppFileSystemRmOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Rm, options)
  },
  mkdir: (options: AppFileSystemMkdirOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Mkdir, options)
  },
  archive: (options: AppFileSystemArchiveOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Archive, options)
  },
  writeFile: (
    filePath: string,
    data: Buffer | Record<string, unknown>,
    encoding?: BufferEncoding | string
  ) => {
    return ipcRenderer.invoke(
      AppFileSystemIpcEvents.WriteFile,
      filePath,
      data,
      encoding
    )
  },
}

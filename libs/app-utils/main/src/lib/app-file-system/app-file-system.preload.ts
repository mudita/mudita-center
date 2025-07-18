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
  rm: (options: AppFileSystemRmOptions): Promise<AppResult> =>
    ipcRenderer.invoke(AppFileSystemIpcEvents.Rm, options),
  mkdir: (options: AppFileSystemMkdirOptions): Promise<AppResult> =>
    ipcRenderer.invoke(AppFileSystemIpcEvents.Mkdir, options),
  archive: (options: AppFileSystemArchiveOptions): Promise<AppResult> =>
    ipcRenderer.invoke(AppFileSystemIpcEvents.Archive, options),
  write: (options: AppFileSystemArchiveOptions): Promise<AppResult> =>
    ipcRenderer.invoke(AppFileSystemIpcEvents.Write, options),
}

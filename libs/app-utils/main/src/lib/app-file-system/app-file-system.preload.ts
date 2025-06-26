/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron"
import {
  AppFileSystemIpcEvents,
  AppFileSystemRmOptions,
  AppResult,
} from "app-utils/models"

export const appFileSystem = {
  rm: (options: AppFileSystemRmOptions): Promise<AppResult> =>
    ipcRenderer.invoke(AppFileSystemIpcEvents.Rm, options),
}

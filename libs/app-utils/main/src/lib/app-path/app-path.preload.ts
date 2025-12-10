/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppPath } from "app-utils/models"

export const appPath = {
  join: (...segments: string[]): Promise<string> =>
    electronAPI.ipcRenderer.invoke(AppPath.Join, ...segments),
}

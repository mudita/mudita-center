/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { FileStatsServiceEvents } from "system-utils/models"
import { ResultObject } from "Core/core/builder"
import { Stats } from "fs-extra"

export const getFileStatsRequest = (
  filePath: string
): Promise<ResultObject<Stats>> => {
  return ipcRenderer.callMain(FileStatsServiceEvents.Get, filePath)
}

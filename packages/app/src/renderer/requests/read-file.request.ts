/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  ReadFileEvents,
  ReadFilesData,
} from "App/main/functions/register-read-file-listener"

const readFile = async (data: ReadFilesData): Promise<Buffer | undefined> => {
  return await ipcRenderer.callMain(ReadFileEvents.Read, data)
}

export default readFile

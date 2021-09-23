/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import writeGzip, { WriteGzipData } from "App/main/utils/write-gzip"

export enum WriteGzipEvents {
  Write = "write-gzip",
}

const registerWriteGzipListener = (): void => {
  ipcMain.answerRenderer<WriteGzipData, Promise<boolean>>(
    WriteGzipEvents.Write,
    writeGzip
  )
}

export default registerWriteGzipListener

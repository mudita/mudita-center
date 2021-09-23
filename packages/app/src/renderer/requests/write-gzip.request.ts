/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { WriteGzipEvents } from "App/main/functions/register-write-gzip-listener"
import { WriteGzipData } from "App/main/utils/write-gzip"

const writeGzip = async (data: WriteGzipData): Promise<boolean> => {
  return await ipcRenderer.callMain(WriteGzipEvents.Write, data)
}

export default writeGzip

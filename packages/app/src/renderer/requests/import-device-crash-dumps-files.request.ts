/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import copyFile from "Renderer/requests/copy-file.request"
import downloadDeviceCrashDumpFiles from "Renderer/requests/download-crash-dump.request"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const importDeviceCrashDumpFiles = async (
  cwd: string
): Promise<RequestResponse> => {
  const { status, data = [] } = await downloadDeviceCrashDumpFiles()
  if (status === RequestResponseStatus.Ok && data) {
    for await (const deviceLogFile of data) {
      const copyFileSuccess = await copyFile({
        sourcePath: deviceLogFile,
        cwd,
      })
      if (!copyFileSuccess) {
        return {
          status: RequestResponseStatus.Error,
        }
      }
    }
    return { status }
  } else {
    return {
      status,
      error: {
        message: "Import device crash dumps failed: isn't possible to download",
      },
    }
  }
}

export default importDeviceCrashDumpFiles

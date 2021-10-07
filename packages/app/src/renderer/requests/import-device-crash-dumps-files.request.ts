/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import copyFile from "Renderer/requests/copy-file.request"
import downloadDeviceCrashDumpFiles from "Renderer/requests/download-crash-dump.request"

const importDeviceCrashDumpFiles = async (
  targetPath: string
): Promise<DeviceResponse> => {
  const { status, data = [] } = await downloadDeviceCrashDumpFiles()
  if (status === DeviceResponseStatus.Ok && data) {
    for await (const deviceLogFile of data) {
      const copyFileSuccess = await copyFile({
        sourcePath: deviceLogFile,
        targetPath,
      })
      if (!copyFileSuccess) {
        return {
          status: DeviceResponseStatus.Error,
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import writeFile from "Renderer/requests/write-file.request"
import getDeviceCrashDumpFiles from "Renderer/requests/get-device-crash-dump-files.request"

const importDeviceCrashDumpFiles = async (
  filePath: string
): Promise<DeviceResponse> => {
  const { status, data = [] } = await getDeviceCrashDumpFiles()
  if (status === DeviceResponseStatus.Ok && data) {
    for (let i = 0; i < data.length; i++) {
      const deviceLogFile = data[i]
      const writeFileSuccess = await writeFile({ filePath, data: deviceLogFile.data, fileName: deviceLogFile.name })
      if(!writeFileSuccess){
        return {
          status: DeviceResponseStatus.Error
        }
      }
    }
    return { status }
  } else {
    return {
      status,
      error: {
        message:
          "Import device crash dumps failed: isn't possible to download",
      },
    }
  }
}

export default importDeviceCrashDumpFiles

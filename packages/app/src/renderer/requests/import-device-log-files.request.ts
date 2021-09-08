/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import { WriteData } from "App/main/functions/register-write-file-listener"
// import writeFile from "Renderer/requests/write-file.request"

const importDeviceLogFiles = async (
  writeData: Omit<WriteData, "data">
): Promise<DeviceResponse> => {
  console.log("importDeviceLogFiles: ", writeData)
  const { status, data = [] } = await getDeviceLogFiles()
  if (status === DeviceResponseStatus.Ok && data) {
    // await writeFile({ ...writeData, data })
    return { status }
  } else {
    return {
      status,
      error: {
        message:
          "Import device logs failed: isn't possible to download error logs",
      },
    }
  }
}

export default importDeviceLogFiles

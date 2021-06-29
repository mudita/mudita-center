/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getDeviceLogs from "Renderer/requests/get-device-logs.request"

const importDeviceLogsFile = async (
  filePath: string
): Promise<DeviceResponse> => {
  const { status, data } = await getDeviceLogs()
  if (status === DeviceResponseStatus.Ok && data) {
    fs.writeFileSync(filePath, data)
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

export default importDeviceLogsFile

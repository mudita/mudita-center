/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getDeviceLogs from "Renderer/requests/get-device-logs.request"
import writeFile from "Renderer/requests/write-file.request"
import { WriteData } from "App/main/functions/register-write-file-listener"

const importDeviceLogsFile = async (
  writeData: Omit<WriteData, "data">
): Promise<DeviceResponse> => {
  const { status, data } = await getDeviceLogs()
  if (status === DeviceResponseStatus.Ok && data) {
    await writeFile({ ...writeData, data })
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

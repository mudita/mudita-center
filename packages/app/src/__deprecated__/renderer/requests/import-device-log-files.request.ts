/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getDeviceLogFiles from "App/__deprecated__/renderer/requests/get-device-log-files.request"
import writeFile from "App/__deprecated__/renderer/requests/write-file.request"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const importDeviceLogFiles = async (cwd: string): Promise<RequestResponse> => {
  const { status, data = [] } = await getDeviceLogFiles({ datePrefix: true })
  if (status === RequestResponseStatus.Ok && data) {
    for (let i = 0; i < data.length; i++) {
      const deviceLogFile = data[i]
      const writeFileSuccess = await writeFile({
        cwd,
        data: deviceLogFile.data,
        fileName: deviceLogFile.name,
      })
      if (!writeFileSuccess) {
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
        message:
          "Import device logs failed: isn't possible to download error logs",
      },
    }
  }
}

export default importDeviceLogFiles

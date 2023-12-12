/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getAppLogs from "Core/__deprecated__/renderer/requests/get-app-logs.request"
import { getDeviceLogFiles } from "Core/device-log/requests/get-device-log-files.request"
import { downloadDeviceFiles } from "Core/device-file-system/requests/download-device-file.request"
import { DeviceFile } from "Core/device-file-system/dto"
import { downloadingLogs } from "."
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"

const successGetDeviceUpdaterLogResponse: RequestResponse<DeviceFile> = {
  status: RequestResponseStatus.Ok,
}

const successGetDeviceLogsResponse: RequestResponse<DeviceFile[]> = {
  status: RequestResponseStatus.Ok,
  data: [],
}
const muditaOSLogs = new File([""], "MuditaOS.log", { type: "text/html" })

jest.mock("Core/__deprecated__/renderer/requests/get-app-logs.request")
jest.mock("Core/device-log/requests/get-device-log-files.request")
jest.mock("Core/device-file-system/requests/download-device-file.request")

describe("DownloadingLogs", () => {
  test("returns array property", async () => {
    ;(getAppLogs as jest.Mock).mockReturnValue(muditaOSLogs)
    ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
      successGetDeviceLogsResponse
    )
    ;(downloadDeviceFiles as jest.Mock).mockReturnValue(
      successGetDeviceUpdaterLogResponse
    )
    const files = await downloadingLogs()
    expect(files).toEqual(expect.any(Array))
  })
})

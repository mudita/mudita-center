/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getAppLogs from "App/__deprecated__/renderer/requests/get-app-logs.request"
import getDeviceLogFiles from "App/__deprecated__/renderer/requests/get-device-log-files.request"
import { downloadDeviceFiles } from "App/device-file-system/requests/download-device-file.request"
import { DeviceFile } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { downloadingLogs } from "."
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const successGetDeviceUpdaterLogResponse: RequestResponse<DeviceFile> = {
  status: RequestResponseStatus.Ok,
}

const successGetDeviceLogsResponse: RequestResponse<DeviceFile[]> = {
  status: RequestResponseStatus.Ok,
  data: [],
}
const muditaOSLogs = new File([""], "MuditaOS.log", { type: "text/html" })

jest.mock("App/__deprecated__/renderer/requests/get-app-logs.request")
jest.mock("App/__deprecated__/renderer/requests/get-device-log-files.request")
jest.mock("App/device-file-system/requests/download-device-file.request")

describe("DownloadingLogs", () => {
  test("return logs files", async () => {
    ;(getAppLogs as jest.Mock).mockReturnValue("MuditaOS.log")
    ;(getDeviceLogFiles as jest.Mock).mockReturnValue(
      successGetDeviceLogsResponse
    )
    ;(downloadDeviceFiles as jest.Mock).mockReturnValue(
      successGetDeviceUpdaterLogResponse
    )
    const files = await downloadingLogs()
    expect(files).toMatchObject([muditaOSLogs])
  })
})

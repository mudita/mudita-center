/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager, { DiagnosticsFileList } from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import DeviceService from "App/__deprecated__/backend/device-service"
import { createDeviceFileDiagnosticService } from "App/__deprecated__/backend/device-file-diagnostic-service/device-file-diagnostic-service"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/__deprecated__/backend/device-service")

describe("DeviceFileDiagnosticService serivce", () => {
  describe("when requests return success for getDiagnosticFileList method", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              files: ["/sys/user/logs/MuditaOS.log"],
            },
          }
        },
      }
    })
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)

    const deviceFileDiagnosticService =
      createDeviceFileDiagnosticService(deviceService)

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } =
        await deviceFileDiagnosticService.getDiagnosticFileList(
          DiagnosticsFileList.LOGS
        )
      expect(status).toEqual(RequestResponseStatus.Ok)
    })

    test("should return properly files length", async () => {
      const { data } = await deviceFileDiagnosticService.getDiagnosticFileList(
        DiagnosticsFileList.LOGS
      )
      expect(data?.files).toHaveLength(1)
    })
  })
})

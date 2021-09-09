/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { createDeviceFileDiagnosticService } from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"

jest.mock("Backend/device-service")

describe("DeviceFileDiagnosticService serivce", () => {
  describe("when requests return success for getAllDiagnosticFileList method", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return {
            status: DeviceResponseStatus.Ok,
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
        await deviceFileDiagnosticService.getAllDiagnosticFileList()
      expect(status).toEqual(DeviceResponseStatus.Ok)
    })

    test("should return properly FileList length", async () => {
      const { data = [] } =
        await deviceFileDiagnosticService.getAllDiagnosticFileList()
      expect(data).toHaveLength(2)
    })
  })
})

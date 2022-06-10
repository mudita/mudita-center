/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager, {
  GetBackupDeviceStatusDataState,
} from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import DeviceService from "App/__deprecated__/backend/device-service"
import createDeviceBackupService from "App/__deprecated__/backend/device-backup-service/device-backup-service"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/__deprecated__/backend/device-service")
const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

describe("DeviceBackupService serivce", () => {
  describe("when requests return success for startBackupDevice method", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              id: backupId,
            },
          }
        },
      }
    })
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)

    const deviceBackupService = createDeviceBackupService(deviceService)

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } = await deviceBackupService.startBackupDevice()
      expect(status).toEqual(RequestResponseStatus.Ok)
    })

    test("should return id in data", async () => {
      const { data } = await deviceBackupService.startBackupDevice()
      expect(typeof data?.id).toEqual("string")
    })
  })

  describe("when requests return success for getBackupDeviceStatus method", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              id: backupId,
              state: GetBackupDeviceStatusDataState.Finished,
            },
          }
        },
      }
    })
    const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)

    const deviceBackupService = createDeviceBackupService(deviceService)

    test("should return DeviceResponseStatus.Ok as status", async () => {
      const { status } = await deviceBackupService.getBackupDeviceStatus({
        id: backupId,
      })
      expect(status).toEqual(RequestResponseStatus.Ok)
    })

    test("should return id in data", async () => {
      const { data } = await deviceBackupService.getBackupDeviceStatus({
        id: backupId,
      })
      expect(typeof data?.id).toEqual("string")
    })

    test("should return state in data", async () => {
      const { data } = await deviceBackupService.getBackupDeviceStatus({
        id: backupId,
      })
      expect(typeof data?.id).toEqual("string")
    })
  })
})

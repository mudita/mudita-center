/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager, {
  GetBackupDeviceStatusDataState,
} from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createDeviceBackupService from "Backend/device-backup-service/device-backup-service"

jest.mock("Backend/device-service")
const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

describe("DeviceBackupService serivce", () => {
  describe("when requests return success for startBackupDevice method", () => {
    ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
      return {
        request: () => {
          return {
            status: DeviceResponseStatus.Ok,
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
      expect(status).toEqual(DeviceResponseStatus.Ok)
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
            status: DeviceResponseStatus.Ok,
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
      expect(status).toEqual(DeviceResponseStatus.Ok)
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

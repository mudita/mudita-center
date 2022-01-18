/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import { DataSync } from "App/data-sync"
import DeviceService from "Backend/device-service"
import createFakeDeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-fake.adapter"
import { ContactIndexer } from "App/data-sync/indexes"

jest.mock("Backend/adapters/device-backup/device-backup-fake.adapter")
jest.mock("Backend/device-service")
jest.mock("App/data-sync/indexes")

beforeEach(() => {
  (ContactIndexer as unknown as jest.Mock).mockClear();
});

describe("`DataSync`", () => {
  describe("when the service dependencies have default state", () => {
    test("`initialize` no return value", () => {
      (createFakeDeviceBackupAdapter as unknown as jest.Mock).mockImplementation(
        () => {
          return {
            backuping: true
          }
        }
      )
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: false
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)

      expect(dataSync.initialize()).toBeUndefined()
    })

    test("`indexAll` no return value", async () => {
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: false
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      jest.spyOn(dataSync.indexesMap, "set")

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).not.toHaveBeenCalled()
    })
  })

  describe("when data Sync is initialized, device connected and the backuping go on", () => {
    test("`indexAll` no call set", async () => {
      ;(createFakeDeviceBackupAdapter as unknown as jest.Mock).mockImplementation(
        () => {
          return {
            backuping: true
          }
        }
      )
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      dataSync.initialize()
      jest.spyOn(dataSync.indexesMap, "set")

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).not.toHaveBeenCalled()
    })
  })

  describe("when data Sync isn't initialized, device connected and the backuping isn't go on", () => {
    test("`indexAll` no call set", async () => {
      ;(createFakeDeviceBackupAdapter as unknown as jest.Mock).mockImplementation(
        () => {
          return {
            backuping: false
          }
        }
      )
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      jest.spyOn(dataSync.indexesMap, "set")

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).not.toHaveBeenCalled()
    })
  })

  describe("when data Sync is initialized, device connected and the backuping isn't go on", () => {
    test("`indexAll` call set", async () => {
      ;(createFakeDeviceBackupAdapter as unknown as jest.Mock).mockImplementation(
        () => {
          return {
            backuping: false
          }
        }
      )
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      jest.spyOn(dataSync.indexesMap, "set")
      dataSync.initialize()

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).toHaveBeenCalled()
    })
  })
})


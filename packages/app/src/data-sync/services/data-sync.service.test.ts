/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import { DataSync } from "App/data-sync/services/data-sync.service"
import DeviceService from "Backend/device-service"
import createFakeDeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-fake.adapter"
import { ContactIndexer } from "App/data-sync/indexes"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getAppPath from "App/main/utils/get-app-path"
import { vol } from "memfs"
import { DirectoryJSON } from "memfs/lib/volume"

jest.mock("Backend/adapters/device-backup/device-backup-fake.adapter")
jest.mock("Backend/device-service")
jest.mock("App/data-sync/indexes")
jest.mock("App/main/utils/get-app-path")
jest.mock("App/file-system/listeners/unlink-file.listener")

const token = "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"

const errorGetBackupLocationResponse: DeviceResponse<string[]> = {
  status: DeviceResponseStatus.Error,
}

const successGetBackupLocationResponse: DeviceResponse<string[]> = {
  status: DeviceResponseStatus.Ok,
  data: ["path/to/directory"],
}

const json: DirectoryJSON = {
  "path/to/directory": "",
}

beforeEach(() => {
  ;(ContactIndexer as unknown as jest.Mock).mockClear()
  vol.reset()
})

describe("`DataSync`", () => {
  describe("when the service dependencies have default state", () => {
    test("`initialize` no return value", () => {
      ;(
        createFakeDeviceBackupAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          backuping: false,
        }
      })
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: false,
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)

      expect(dataSync.initialize(token)).toBeUndefined()
    })

    test("`indexAll` no return value", async () => {
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: false,
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
      ;(
        createFakeDeviceBackupAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          backuping: true,
        }
      })
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true,
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      dataSync.initialize(token)
      jest.spyOn(dataSync.indexesMap, "set")

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).not.toHaveBeenCalled()
    })
  })

  describe("when data Sync isn't initialized, device connected and the backuping isn't go on", () => {
    test("`indexAll` no call set", async () => {
      ;(
        createFakeDeviceBackupAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          backuping: false,
        }
      })
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true,
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

  describe("when data Sync is initialized, device connected and the backuping isn't go on and backup fails", () => {
    test("`indexAll` no call set", async () => {
      vol.fromJSON(json, "/")
      ;(getAppPath as unknown as jest.Mock).mockImplementation(() => "")
      ;(
        createFakeDeviceBackupAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          backuping: false,
          downloadDeviceBackup: () => errorGetBackupLocationResponse,
        }
      })
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true,
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      jest.spyOn(dataSync.indexesMap, "set")
      dataSync.initialize(token)

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).not.toHaveBeenCalled()
    })
  })
  describe("when data Sync is initialized, device connected and the backuping isn't go on", () => {
    test("`indexAll` call set", async () => {
      vol.fromJSON(json, "/")
      ;(getAppPath as unknown as jest.Mock).mockImplementation(() => "")
      ;(
        createFakeDeviceBackupAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          backuping: false,
          downloadDeviceBackup: () => successGetBackupLocationResponse,
        }
      })
      ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
        return {
          currentDeviceUnlocked: true,
        }
      })
      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackup = createFakeDeviceBackupAdapter()

      const dataSync = new DataSync(deviceService, deviceBackup)
      jest.spyOn(dataSync.indexesMap, "set")
      dataSync.initialize(token)

      expect(await dataSync.indexAll()).toBeUndefined()
      expect(dataSync.indexesMap.set).toHaveBeenCalled()
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocolService } from "device-protocol/feature"
import { Endpoint, Method } from "core-device/models"
import { BackupCategory, PhoneLockCategory } from "Core/device"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { BackupCreateService } from "Core/backup/services/backup-create.service"
import { MetadataStore, MetadataKey } from "Core/metadata"
import { BackupError, Operation } from "Core/backup/constants"
import { UpdaterStatus } from "Core/backup/dto"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { FileManagerService } from "Core/files-manager/services"
import { DeviceInfoService } from "Core/device-info/services"

const updaterStatusSuccessMock: UpdaterStatus = {
  branch: "",
  message: "",
  revision: "",
  version: "1.2.3",
  operation: Operation.Backup,
  successful: true,
}

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceProtocolService

const deviceFileSystemAdapter = {
  downloadDeviceFilesLocally: jest.fn(),
  removeDeviceFile: jest.fn(),
  downloadFile: jest.fn(),
} as unknown as DeviceFileSystemService

const keyStorage = new MetadataStore()

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const fileManagerService = {
  getDeviceFiles: jest.fn(),
} as unknown as FileManagerService

const deviceInfoService = {
  getDeviceInfo: jest.fn(),
} as unknown as DeviceInfoService

const subject = new BackupCreateService(
  deviceManager,
  deviceFileSystemAdapter,
  fileManagerService,
  deviceInfoService,
  keyStorage
)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("Backup process happy path", () => {
  test("Returns the `Result.success` object with backup data", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Backup &&
          config.method === Method.Post
        ) {
          return Result.success(true)
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return Result.success(true)
        }

        return Result.failed(new AppError("", ""))
      })
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        backupFilePath: "/user/local/backup/fileBase.tar",
        recoveryStatusFilePath: "/user/local/recovery/updater_status.json",
        memorySpace: {
          total: 14000,
          usedUserSpace: 2000,
          reservedSpace: 0,
        },
      })
    )
    fileManagerService.getDeviceFiles = jest
      .fn()
      .mockResolvedValue(Result.success([]))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValue(
        Result.success(JSON.stringify(updaterStatusSuccessMock))
      )

    deviceFileSystemAdapter.downloadDeviceFilesLocally = jest
      .fn()
      .mockResolvedValue(Result.success(["/user/backup/backup.tar"]))

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(Result.success(["/user/backup/backup.tar"]))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenNthCalledWith(1, {
      endpoint: Endpoint.Backup,
      method: Method.Post,
      body: { category: BackupCategory.Backup },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenNthCalledWith(2, {
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystemAdapter.downloadFile).toHaveBeenLastCalledWith(
      "/user/local/recovery/updater_status.json"
    )
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemAdapter.downloadDeviceFilesLocally
    ).toHaveBeenLastCalledWith(["/user/local/backup/fileBase.tar"], {
      key: "1234",
      cwd: "/User/documents/backup",
    })
    // TODO: please remove custom timeout
  }, 10000)
})

describe("Backup process failed path", () => {
  test("Returns the `Result.failed` with `BackupError.BackupInProgress` if metadata service has `MetadataKey.BackupInProgress` key setup to `true`", async () => {
    keyStorage.setValue(MetadataKey.BackupInProgress, true)

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.BackupInProgress, "Backup is in progress")
      )
    )

    keyStorage.setValue(MetadataKey.BackupInProgress, false)
  })

  test("Returns the `Result.failed` with `BackupError.BackupSpaceIsNotEnough` when user space is full", async () => {
    fileManagerService.getDeviceFiles = jest
      .fn()
      .mockResolvedValue(Result.success([]))
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        backupFilePath: "/user/local/backup/fileBase.tar",
        recoveryStatusFilePath: "/user/local/recovery/updater_status.json",
        memorySpace: {
          total: 14000,
          usedUserSpace: 14000,
          reservedSpace: 0,
        },
      })
    )

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.BackupSpaceIsNotEnough,
          "Backup space is not enough",
          100
        )
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.CannotReachBackupLocation` if `DeviceInfo` endpoint return error status", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValue(Result.failed(new AppError("", "")))
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        memorySpace: {
          total: 14000,
          usedUserSpace: 2000,
          reservedSpace: 0,
        },
      })
    )
    fileManagerService.getDeviceFiles = jest
      .fn()
      .mockResolvedValue(Result.success([]))

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.CannotReachBackupLocation,
          "Cannot find backup on device"
        )
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.CannotReachBackupLocation` if `Backup` endpoint return error status", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValue(Result.failed(new AppError("", "")))
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        backupFilePath: "/user/local/backup/fileBase.tar",
        memorySpace: {
          total: 14000,
          usedUserSpace: 2000,
          reservedSpace: 0,
        },
      })
    )
    fileManagerService.getDeviceFiles = jest
      .fn()
      .mockResolvedValue(Result.success([]))

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.CannotReachBackupLocation,
          "Cannot find backup on device"
        )
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.BackupProcessFailed` if `deviceFileSystem.downloadFile` returns error status", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Backup &&
          config.method === Method.Post
        ) {
          return Result.success(true)
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return Result.success(true)
        }

        return Result.failed(new AppError("", ""))
      })
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        backupFilePath: "/user/local/backup/backupFilePath",
        memorySpace: {
          total: 14000,
          usedUserSpace: 2000,
          reservedSpace: 0,
        },
      })
    )
    fileManagerService.getDeviceFiles = jest
      .fn()
      .mockResolvedValue(Result.success([]))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValue(Result.failed(new AppError("", "")))

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.BackupProcessFailed,
          "Device backup operation failed"
        )
      )
    )
    // TODO: please remove custom timeout
  }, 10000)

  test("Returns the `Result.failed` with `BackupError.BackupDownloadFailed` if `deviceFileSystem.downloadDeviceFilesLocally` returns error status", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Backup &&
          config.method === Method.Post
        ) {
          return Result.success(true)
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return Result.success(true)
        }

        return Result.failed(new AppError("", ""))
      })
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        backupFilePath: "/user/local/backup/backupFilePath",
        memorySpace: {
          total: 14000,
          usedUserSpace: 2000,
          reservedSpace: 0,
        },
      })
    )
    fileManagerService.getDeviceFiles = jest
      .fn()
      .mockResolvedValue(Result.success([]))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValue(
        Result.success(JSON.stringify(updaterStatusSuccessMock))
      )

    deviceFileSystemAdapter.downloadDeviceFilesLocally = jest
      .fn()
      .mockResolvedValue(Result.failed(new AppError("", "")))

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.BackupDownloadFailed, "Download backup fails")
      )
    )
    // TODO: please remove custom timeout
  }, 10000)
})

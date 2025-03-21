/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import { Endpoint, Method } from "core-device/models"
import { DeviceProtocol } from "device-protocol/feature"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { BackupRestoreService } from "Core/backup/services/backup-restore.service"
import CryptoFileService from "Core/file-system/services/crypto-file-service/crypto-file-service"
import { BackupError, Operation } from "Core/backup/constants"
import { UpdaterStatus } from "Core/backup/dto"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { DeviceInfoService } from "Core/device-info/services"

jest.mock("history", () => ({
  createHashHistory: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    location: { pathname: "", search: "", hash: "", state: null },
  })),
}))

const arrayBufferToBuffer = (unitArray: Uint8Array): Buffer => {
  const buffer = Buffer.alloc(unitArray.byteLength)
  const view = new Uint8Array(unitArray)
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i]
  }
  return buffer
}

const encodedBackupMock = fs.readFileSync(
  path.join(
    __dirname,
    "../../../../jest/testing-support/mocks/encoded-backup.tar"
  )
)

const updaterStatusSuccessMock: UpdaterStatus = {
  branch: "",
  message: "",
  revision: "",
  version: "1.2.3",
  operation: Operation.Restore,
  successful: true,
}

const updaterStatusFailedMock: UpdaterStatus = {
  branch: "",
  message: "",
  revision: "",
  version: "1.2.3",
  operation: Operation.Restore,
  successful: false,
}

const updaterStatusSuccessForAnotherOperationMock: UpdaterStatus = {
  branch: "",
  message: "",
  revision: "",
  version: "1.2.3",
  operation: Operation.Recovery,
  successful: true,
}

const deviceProtocol = {
  device: {
    request: jest.fn(),
  },
  request: jest.fn(),
} as unknown as DeviceProtocol

const deviceFileSystemAdapter = {
  uploadFile: jest.fn(),
  removeDeviceFile: jest.fn(),
  downloadFile: jest.fn(),
} as unknown as DeviceFileSystemService

const fileSystemServiceMock = {
  readFileSync: jest.fn(),
  validateEncryptedZippedFile: jest.fn(),
  exists: jest.fn(),
} as unknown as FileSystemService

const deviceInfoService = {
  getDeviceInfo: jest.fn(),
} as unknown as DeviceInfoService

const subject = new BackupRestoreService(
  deviceProtocol,
  deviceFileSystemAdapter,
  deviceInfoService,
  fileSystemServiceMock
)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("Restore process happy path", () => {
  test("Returns the `Result.success` object restore status", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(true))
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValueOnce(
        Result.success(JSON.stringify(updaterStatusSuccessMock))
      )
    deviceProtocol.request = jest
      .fn()
      .mockImplementation(
        (deviceId, config: { endpoint: Endpoint; method: Method }) => {
          if (
            config.endpoint === Endpoint.Restore &&
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
        }
      )
    deviceProtocol.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Restore &&
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
      })
    )
    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(Result.success(true))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(fileSystemServiceMock.readFile).toHaveBeenLastCalledWith(
      "/backup.tar"
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystemAdapter.uploadFile).toHaveBeenLastCalledWith({
      data: arrayBufferToBuffer(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        CryptoFileService.decrypt({
          buffer: encodedBackupMock,
          key: "1234567890",
        })!
      ),
      targetPath: "/usr/backup/fileBase.tar",
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).toHaveBeenNthCalledWith(1, {
      endpoint: Endpoint.Restore,
      method: Method.Post,
      body: { restore: "fileBase.tar" },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.request).toHaveBeenNthCalledWith(1, undefined, {
      body: { category: "phoneLockStatus" },
      endpoint: 13,
      method: 1,
    })
    // TODO: please remove custom timeout
  }, 10000)
})

test("Returns the `Result.failed` with `BackupError.CannotReadBackupFile` local backup file doesn't exist", async () => {
  fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
  fileSystemServiceMock.readFile = jest
    .fn()
    .mockRejectedValueOnce("Can not find file or directory")

  fileSystemServiceMock.validateEncryptedZippedFile = jest
    .fn()
    .mockResolvedValueOnce(Promise.resolve(true))

  const result = await subject.restoreBackup({
    filePath: "/backup.tar",
    backupFilePath: "/usr/backup/fileBase.tar",
    token: "1234567890",
  })

  expect(result).toEqual(
    Result.failed(
      new AppError(
        BackupError.CannotReadBackupFile,
        "File: /backup.tar is unreadable"
      )
    )
  )
})

describe("Backup restoring failed path", () => {
  test("Returns the `Result.failed` with `BackupError.BackupFileIsInvalid` if `deviceFileSystem.validateEncryptedZippedFile` method return false", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(false))

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.InvalidToken, "File: token is incorrect")
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.CannotUploadBackupToDevice` if `deviceFileSystem.uploadFile` method return error status", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(true))
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.failed(new AppError("", "")))

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.CannotUploadBackupToDevice,
          "Cannot upload backup to device"
        )
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.CannotRestoreBackup` if `Endpoint.Restore` endpoint returns error status", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(true))
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    deviceProtocol.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Backup &&
          config.method === Method.Post
        ) {
          return Result.failed(new AppError("", ""))
        }

        return Result.failed(new AppError("", ""))
      })
    deviceProtocol.request = deviceProtocol.device.request = jest
      .fn()
      .mockResolvedValue(Result.failed(new AppError("", "")))
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValue(
      Result.success({
        backupFilePath: "/user/local/backup/backupFilePath",
      })
    )
    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.CannotRestoreBackup, "Cannot restore backup")
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.CannotGetProcessStatus` if `deviceFileSystem.downloadFile` method doesn't return response", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(true))
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.failed(new AppError("", "")))
    deviceProtocol.request = jest
      .fn()
      .mockImplementation(
        (deviceId, config: { endpoint: Endpoint; method: Method }) => {
          if (
            config.endpoint === Endpoint.Restore &&
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
        }
      )
    deviceProtocol.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Restore &&
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
      })
    )
    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.CannotGetProcessStatus,
          "Can't get /user/local/recovery/updater_status.json from device"
        )
      )
    )
    // TODO: please remove custom timeout
  }, 10000)

  test("Returns the `Result.failed` with `BackupError.OperationFailed` if `deviceFileSystem.downloadFile` method returns status but for another operation", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(true))
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValueOnce(
        Result.success(
          JSON.stringify(updaterStatusSuccessForAnotherOperationMock)
        )
      )
    deviceProtocol.request = jest
      .fn()
      .mockImplementation(
        (deviceId, config: { endpoint: Endpoint; method: Method }) => {
          if (
            config.endpoint === Endpoint.Restore &&
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
        }
      )
    deviceProtocol.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Restore &&
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
      })
    )
    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.OperationDoesNotMatch,
          "The operation restore doesn't match to operation type recovery"
        )
      )
    )
    // TODO: please remove custom timeout
  }, 10000)

  test("Returns the `Result.failed` with `BackupError.OperationFailed` if `deviceFileSystem.downloadFile` method returns status but with fail status", async () => {
    fileSystemServiceMock.exists = jest.fn().mockResolvedValue(true)
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    fileSystemServiceMock.validateEncryptedZippedFile = jest
      .fn()
      .mockResolvedValueOnce(Promise.resolve(true))
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    deviceFileSystemAdapter.downloadFile = jest
      .fn()
      .mockResolvedValueOnce(
        Result.success(JSON.stringify(updaterStatusFailedMock))
      )
    deviceProtocol.request = jest
      .fn()
      .mockImplementation(
        (deviceId, config: { endpoint: Endpoint; method: Method }) => {
          if (
            config.endpoint === Endpoint.Restore &&
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
        }
      )
    deviceProtocol.device.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.Restore &&
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
      })
    )

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupFilePath: "/usr/backup/fileBase.tar",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.OperationFailed, "Operation: restore - Failed")
      )
    )
    // TODO: please remove custom timeout
  }, 10000)
})

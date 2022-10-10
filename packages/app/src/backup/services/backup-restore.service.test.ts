/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, PhoneLockCategory } from "@mudita/pure"
import fs from "fs"
import path from "path"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { BackupRestoreService } from "App/backup/services/backup-restore.service"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { BackupError, Operation, OperationStatus } from "App/backup/constants"
import { UpdaterStatus } from "App/backup/dto"
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

const arrayBufferToBuffer = (unitArray: Uint8Array): Buffer => {
  const buffer = Buffer.alloc(unitArray.byteLength)
  const view = new Uint8Array(unitArray)
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i]
  }
  return buffer
}

const encodedBackupMock = fs.readFileSync(
  path.join(__dirname, "../../testing-support/mocks/encoded-backup.tar")
)

const updaterStatusSuccessMock: UpdaterStatus = {
  updater_version: "1.2.3",
  performed_operation: Operation.Restore,
  operation_result: OperationStatus.Success,
}

const updaterStatusFailedMock: UpdaterStatus = {
  updater_version: "1.2.3",
  performed_operation: Operation.Restore,
  operation_result: OperationStatus.Failed,
}

const updaterStatusSuccessForAnotherOperationMock: UpdaterStatus = {
  updater_version: "1.2.3",
  performed_operation: Operation.Recovery,
  operation_result: OperationStatus.Success,
}

const successResponseMock: RequestResponse = {
  status: RequestResponseStatus.Ok,
}

const errorResponseMock: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const deviceFileSystemAdapter = {
  uploadFile: jest.fn(),
  removeDeviceFile: jest.fn(),
  downloadFile: jest.fn(),
} as unknown as DeviceFileSystemAdapter

const fileSystemServiceMock = {
  readFileSync: jest.fn(),
} as unknown as FileSystemService

const subject = new BackupRestoreService(
  deviceService,
  deviceFileSystemAdapter,
  fileSystemServiceMock
)

afterEach(() => {
  jest.clearAllMocks()
})

describe("Restore process happy path", () => {
  test("Returns the `Result.success` object restore status", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(successResponseMock)
    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValueOnce({
      status: RequestResponseStatus.Ok,
      data: JSON.stringify(updaterStatusSuccessMock),
    })
    deviceService.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              backupLocation: "/user/local/backup/",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Restore &&
          config.method === Method.Post
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        return {
          status: RequestResponseStatus.Error,
        }
      })

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
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
      targetPath: "/usr/backup/backup.tar",
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(1, {
      endpoint: Endpoint.Restore,
      method: Method.Post,
      body: { restore: "backup.tar" },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(2, {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(3, {
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  })
})

describe("Backup restoring failed path", () => {
  test("Returns the `Result.failed` with `BackupError.CannotReadBackupFile` local backup file doesn't exist", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockRejectedValueOnce("Can not find file or directory")
    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
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

  test("Returns the `Result.failed` with `BackupError.CannotUploadBackupToDevice` if `deviceFileSystem.uploadFile` method return error status", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(errorResponseMock)

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
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
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(successResponseMock)
    deviceService.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              backupLocation: "/user/local/backup/",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Backup &&
          config.method === Method.Post
        ) {
          return {
            status: RequestResponseStatus.Error,
          }
        }

        return {
          status: RequestResponseStatus.Error,
        }
      })

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.CannotRestoreBackup, "Cannot restore backup")
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.RestoreBackupFailed` if `Endpoint.DeviceInfo` endpoint returns error status during awaiting", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(successResponseMock)
    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValueOnce({
      status: RequestResponseStatus.Ok,
      data: JSON.stringify(updaterStatusSuccessMock),
    })
    deviceService.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Error,
          }
        }

        if (
          config.endpoint === Endpoint.Restore &&
          config.method === Method.Post
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        return {
          status: RequestResponseStatus.Error,
        }
      })

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.RestoreBackupFailed, "Device didn't wake up")
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.CannotGetProcessStatus` if `deviceFileSystem.downloadFile` method doesn't return response", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(successResponseMock)
    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValueOnce({
      status: RequestResponseStatus.Ok,
      data: undefined,
    })
    deviceService.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              backupLocation: "/user/local/backup/",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Restore &&
          config.method === Method.Post
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        return {
          status: RequestResponseStatus.Error,
        }
      })

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          BackupError.CannotGetProcessStatus,
          "Can't get /user/updater_status.json from device"
        )
      )
    )
  })

  test("Returns the `Result.failed` with `BackupError.OperationFailed` if `deviceFileSystem.downloadFile` method returns status but for another operation", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(successResponseMock)
    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValueOnce({
      status: RequestResponseStatus.Ok,
      data: JSON.stringify(updaterStatusSuccessForAnotherOperationMock),
    })
    deviceService.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              backupLocation: "/user/local/backup/",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Restore &&
          config.method === Method.Post
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        return {
          status: RequestResponseStatus.Error,
        }
      })

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
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
  })

  test("Returns the `Result.failed` with `BackupError.OperationFailed` if `deviceFileSystem.downloadFile` method returns status but for another operation", async () => {
    fileSystemServiceMock.readFile = jest
      .fn()
      .mockResolvedValueOnce(encodedBackupMock)
    deviceFileSystemAdapter.uploadFile = jest
      .fn()
      .mockResolvedValueOnce(successResponseMock)
    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValueOnce({
      status: RequestResponseStatus.Ok,
      data: JSON.stringify(updaterStatusFailedMock),
    })
    deviceService.request = jest
      .fn()
      .mockImplementation((config: { endpoint: Endpoint; method: Method }) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              backupLocation: "/user/local/backup/",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Restore &&
          config.method === Method.Post
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        if (
          config.endpoint === Endpoint.Security &&
          config.method === Method.Get
        ) {
          return {
            status: RequestResponseStatus.Ok,
          }
        }

        return {
          status: RequestResponseStatus.Error,
        }
      })

    const result = await subject.restoreBackup({
      filePath: "/backup.tar",
      backupLocation: "/usr/backup",
      token: "1234567890",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.OperationFailed, "Operation: restore - Failed")
      )
    )
  })
})

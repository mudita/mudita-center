/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  BackupCategory,
  PhoneLockCategory,
} from "@mudita/pure"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { BackupCreateService } from "App/backup/services/backup-create.service"
import { MetadataStore, MetadataKey } from "App/metadata"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { BackupError, Operation, OperationStatus } from "App/backup/constants"
import { UpdaterStatus } from "App/backup/dto"
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"

const updaterStatusSuccessMock: UpdaterStatus = {
  branch: "",
  message: "",
  revision: "",
  version: "1.2.3",
  operation: Operation.Backup,
  successful: true,
}

const errorResponseMock: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const deviceFileSystemAdapter = {
  downloadDeviceFilesLocally: jest.fn(),
  removeDeviceFile: jest.fn(),
  downloadFile: jest.fn(),
} as unknown as DeviceFileSystemAdapter

const keyStorage = new MetadataStore()

const subject = new BackupCreateService(
  deviceService,
  deviceFileSystemAdapter,
  keyStorage
)

afterEach(() => {
  jest.clearAllMocks()
})

describe("Backup process happy path", () => {
  test("Returns the `Result.success` object with backup data", async () => {
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
              backupFilePath: "/user/local/backup/fileBase.tar",
              recoveryStatusFilePath:
                "/user/local/recovery/updater_status.json",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Backup &&
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

    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValue({
      status: RequestResponseStatus.Ok,
      data: JSON.stringify(updaterStatusSuccessMock),
    })

    deviceFileSystemAdapter.downloadDeviceFilesLocally = jest
      .fn()
      .mockResolvedValue({
        status: RequestResponseStatus.Ok,
        data: ["/user/backup/backup.tar"],
      })

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(Result.success(["/user/backup/backup.tar"]))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(1, {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(2, {
      endpoint: Endpoint.Backup,
      method: Method.Post,
      body: { category: BackupCategory.Backup },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(3, {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceService.request).toHaveBeenNthCalledWith(4, {
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
  })
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

  test("Returns the `Result.failed` with `BackupError.CannotReachBackupLocation` if `DeviceInfo` endpoint return error status", async () => {
    deviceService.request = jest.fn().mockResolvedValue(errorResponseMock)

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
              backupFilePath: "/user/local/backup/fileBase.tar",
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
              backupFilePath: "/user/local/backup/backupFilePath",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Backup &&
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

    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValue({
      status: RequestResponseStatus.Error,
    })

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
  })

  test("Returns the `Result.failed` with `BackupError.BackupDownloadFailed` if `deviceFileSystem.downloadDeviceFilesLocally` returns error status", async () => {
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
              backupFilePath: "/user/local/backup/backupFilePath",
            },
          }
        }

        if (
          config.endpoint === Endpoint.Backup &&
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

    deviceFileSystemAdapter.downloadFile = jest.fn().mockResolvedValue({
      status: RequestResponseStatus.Ok,
      data: JSON.stringify(updaterStatusSuccessMock),
    })

    deviceFileSystemAdapter.downloadDeviceFilesLocally = jest
      .fn()
      .mockResolvedValue({
        status: RequestResponseStatus.Error,
      })

    const result = await subject.createBackup({
      key: "1234",
      cwd: "/User/documents/backup",
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(BackupError.BackupDownloadFailed, "Download backup fails")
      )
    )
  })
})

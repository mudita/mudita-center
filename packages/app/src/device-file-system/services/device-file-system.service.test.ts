/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceCommunicationError } from "App/device/constants"
import { DeviceManager } from "App/device-manager/services"
import {
  DownloadFileSystemRequestConfig,
  GetFileSystemRequestConfig,
  PutFileSystemRequestConfig,
  SendFileSystemRequestConfig,
} from "App/device/types/mudita-os"
import {
  firstsPartDecodeLog,
  firstsPartEncodeLog,
  secondsPartDecodeLog,
  secondsPartEncodeLog,
} from "App/testing-support/mocks/diagnostic-data.mock"
import { DeviceFileSystemService } from "App/device-file-system/services/device-file-system.service"

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const deviceFileSystem = new DeviceFileSystemService(deviceManager)

beforeEach(() => {
  jest.clearAllMocks()
})

test("downloading file handle properly chunks data", async () => {
  deviceManager.device.request = jest
    .fn()
    .mockImplementation(
      (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return Result.success({
            rxID: "1",
            fileSize: 2,
            chunkSize: 1,
          })
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return Result.success({ data: firstsPartEncodeLog })
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 2
        ) {
          return Result.success({
            data: secondsPartEncodeLog,
            fileCrc32: "30898fa4",
          })
        } else {
          return Result.failed(
            new AppError(
              DeviceCommunicationError.RequestFailed,
              "Something went wrong"
            )
          )
        }
      }
    )

  const { ok, data } = await deviceFileSystem.downloadFile(
    "/sys/user/mock-file-name.log"
  )

  expect(ok).toBeTruthy()
  expect(data?.toString()).toEqual(
    `${firstsPartDecodeLog}${secondsPartDecodeLog}`
  )
})

test("downloading file handle properly chunks data if fileSize is less than chunkSize", async () => {
  deviceManager.device.request = jest
    .fn()
    .mockImplementation(
      (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return Result.success({
            rxID: "1",
            fileSize: 0.5,
            chunkSize: 1,
          })
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return Result.success({
            data: firstsPartEncodeLog,
            fileCrc32: "91c634cd",
          })
        } else {
          return Result.failed(
            new AppError(
              DeviceCommunicationError.RequestFailed,
              "Something went wrong"
            )
          )
        }
      }
    )

  const { ok, data } = await deviceFileSystem.downloadFile(
    "/sys/user/mock-file-name.log"
  )
  expect(ok).toBeTruthy()
  expect(data?.toString()).toEqual(firstsPartDecodeLog)
})

test("downloading file return error when part of the chunks data is broken", async () => {
  deviceManager.device.request = jest
    .fn()
    .mockImplementation(
      (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return Result.success({
            rxID: "1",
            fileSize: 2,
            chunkSize: 1,
          })
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return Result.success({
            data: firstsPartEncodeLog,
          })
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 2
        ) {
          return Result.success(undefined)
        } else {
          return Result.failed(
            new AppError(
              DeviceCommunicationError.RequestFailed,
              "Something went wrong"
            )
          )
        }
      }
    )

  const { ok, data } = await deviceFileSystem.downloadFile(
    "/sys/user/mock-file-name.log"
  )
  expect(ok).toBeFalsy()
  expect(data).toEqual(undefined)
})

test("downloading file returns error properly", async () => {
  deviceManager.device.request = jest.fn().mockImplementation(() => {
    return Result.failed(
      new AppError(
        DeviceCommunicationError.RequestFailed,
        "Something went wrong"
      )
    )
  })

  const { ok } = await deviceFileSystem.downloadFile(
    "/sys/user/mock-file-name.log"
  )
  expect(ok).toBeFalsy()
})

test("upload file file handle properly chunks data", async () => {
  deviceManager.device.request = jest
    .fn()
    .mockImplementation(
      (config: PutFileSystemRequestConfig | SendFileSystemRequestConfig) => {
        if (
          (config as PutFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return Result.success({
            txID: "1",
            chunkSize: 7,
          })
        } else if (
          (config as SendFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return Result.success({
            txID: "1",
            chunkNo: 1,
          })
        } else if (
          (config as SendFileSystemRequestConfig).body?.chunkNo === 2
        ) {
          return Result.success({
            txID: "1",
            chunkNo: 2,
          })
        } else {
          return Result.failed(
            new AppError(
              DeviceCommunicationError.RequestFailed,
              "Something went wrong"
            )
          )
        }
      }
    )

  const filePath = path.join(__dirname, "./mock-file.txt")
  const { ok } = await deviceFileSystem.uploadFileLocally({
    filePath,
    targetPath: "/sys/user",
  })
  expect(ok).toBeFalsy()
})

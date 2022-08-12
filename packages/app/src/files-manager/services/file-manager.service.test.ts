/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SuccessResult, FailedResult } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceDirectory } from "App/files-manager/constants"
import { FilesManagerError } from "App/files-manager/constants"
import { FileManagerService } from "App/files-manager/services/file-manager.service"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "App/device-file-system/commands"
import { DeviceFileSystemError } from "App/device-file-system/constants"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const retrieveFilesCommand = {
  exec: jest.fn(),
} as unknown as RetrieveFilesCommand

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const fileUploadCommand = {
  exec: jest.fn(),
} as unknown as FileUploadCommand

const subject = new FileManagerService(retrieveFilesCommand, fileUploadCommand)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("Method: getDeviceFiles", () => {
  describe("When `RetrieveFilesCommand` returns `Result.success` object with list of files", () => {
    test("returns result with serialized files", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      retrieveFilesCommand.exec = jest.fn().mockResolvedValueOnce(
        new SuccessResult({
          [DeviceDirectory.Music]: [
            {
              path: "/test/file-1.mp3",
              fileSize: 654321,
            },
          ],
        })
      )

      const result = await subject.getDeviceFiles(DeviceDirectory.Music)

      expect(result).toEqual(
        new SuccessResult([
          {
            name: "file-1.mp3",
            type: "mp3",
            id: "/test/file-1.mp3",
            size: 654321,
          },
        ])
      )
    })
  })

  describe("When `RetrieveFilesCommand` returns `Result.failed` result object", () => {
    test("returns result with error", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      retrieveFilesCommand.exec = jest.fn().mockResolvedValueOnce(
        new FailedResult({
          ...new AppError(
            DeviceFileSystemError.FilesRetrieve,
            "Something wen't wrong"
          ),
        })
      )

      const result = await subject.getDeviceFiles(DeviceDirectory.Music)

      expect(result).toEqual(
        new FailedResult({
          ...new AppError(FilesManagerError.GetFiles, "Something wen't wrong"),
        })
      )
    })
  })
})

describe("Method: uploadFiles", () => {
  describe("When `FileUploadCommand` returns `Result.success` object", () => {
    test("returns success result object with uploaded path", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fileUploadCommand.exec = jest
        .fn()
        .mockResolvedValueOnce(new SuccessResult("/test/path/file-1.mp3"))

      const result = await subject.uploadFiles({
        directory: DeviceDirectory.Music,
        paths: ["/usr/audio/file-1.mp3"],
      })

      expect(result).toEqual(new SuccessResult(["/usr/audio/file-1.mp3"]))
    })
  })

  describe("When `FileUploadCommand` returns `Result.failed` object", () => {
    test("returns success result object with uploaded path", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fileUploadCommand.exec = jest.fn().mockResolvedValueOnce(
        new FailedResult({
          ...new AppError(
            DeviceFileSystemError.FileUploadRequest,
            "Uploading file: Something went wrong in init sending request"
          ),
        })
      )

      const result = await subject.uploadFiles({
        directory: DeviceDirectory.Music,
        paths: ["/usr/audio/file-1.mp3"],
      })

      expect(result).toEqual(
        new FailedResult({
          ...new AppError(FilesManagerError.UploadFiles, "Upload failed"),
        })
      )
    })
  })
})

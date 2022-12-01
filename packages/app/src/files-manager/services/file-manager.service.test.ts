/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceDirectory } from "App/files-manager/constants"
import { FilesManagerError } from "App/files-manager/constants"
import { FileManagerService } from "App/files-manager/services/file-manager.service"
import {
  RetrieveFilesCommand,
  FileUploadCommand,
} from "App/device-file-system/commands"
import { DeviceFileSystemError } from "App/device-file-system/constants"
import { FileDeleteCommand } from "App/device-file-system/commands/file-delete.command"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const fileDeleteCommand = {
  exec: jest.fn(),
} as unknown as FileDeleteCommand
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

const subject = new FileManagerService(
  fileDeleteCommand,
  retrieveFilesCommand,
  fileUploadCommand
)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("Method: getDeviceFiles", () => {
  describe("When `RetrieveFilesCommand` returns `Result.success` object with list of files", () => {
    test("returns result with serialized files", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      retrieveFilesCommand.exec = jest.fn().mockResolvedValueOnce(
        Result.success({
          [DeviceDirectory.Music]: [
            {
              path: "/test/file-1.mp3",
              fileSize: 654321,
            },
          ],
        })
      )

      const result = await subject.getDeviceFiles({
        directory: DeviceDirectory.Music,
      })

      expect(result).toEqual(
        Result.success([
          {
            name: "file-1.mp3",
            type: "mp3",
            id: "/test/file-1.mp3",
            size: 654321,
          },
        ])
      )
    })

    test("returns result with serialized files and filtered", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      retrieveFilesCommand.exec = jest.fn().mockResolvedValueOnce(
        Result.success({
          [DeviceDirectory.Music]: [
            {
              path: "/test/file-1.mp3",
              fileSize: 654321,
            },
            {
              path: "/test/file-1.zip",
              fileSize: 654321,
            },
          ],
        })
      )

      const result = await subject.getDeviceFiles({
        directory: DeviceDirectory.Music,
        filter: { extensions: ["mp3"] },
      })

      expect(result).toEqual(
        Result.success([
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
        Result.failed({
          ...new AppError(
            DeviceFileSystemError.FilesRetrieve,
            "Something wen't wrong"
          ),
        })
      )

      const result = await subject.getDeviceFiles({
        directory: DeviceDirectory.Music,
      })

      expect(result).toEqual(
        Result.failed(
          new AppError(FilesManagerError.GetFiles, "Something wen't wrong")
        )
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
        .mockResolvedValueOnce(Result.success("/test/path/file-1.mp3"))

      const result = await subject.uploadFiles({
        directory: DeviceDirectory.Music,
        filePaths: ["/usr/audio/file-1.mp3"],
      })

      expect(result).toEqual(Result.success(["/usr/audio/file-1.mp3"]))
    })
  })

  describe("When `FileUploadCommand` returns `Result.failed` object", () => {
    test("returns failed result object with error", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fileUploadCommand.exec = jest
        .fn()
        .mockResolvedValueOnce(
          Result.failed(
            new AppError(
              DeviceFileSystemError.FileUploadRequest,
              "Uploading file: Something went wrong in init sending request"
            )
          )
        )

      const result = await subject.uploadFiles({
        directory: DeviceDirectory.Music,
        filePaths: ["/usr/audio/file-1.mp3"],
      })

      expect(result).toEqual(
        Result.failed(
          new AppError(FilesManagerError.UploadFiles, "Upload failed")
        )
      )
    })
  })

  describe("when `FileUploadCommand` returns `Result.failed` with `DeviceFileSystemError.NoSpaceLeft` error type", () => {
    test("returns failed result with `FilesManagerError.NotEnoughSpace` error type", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fileUploadCommand.exec = jest
        .fn()
        .mockResolvedValueOnce(
          Result.failed(
            new AppError(
              DeviceFileSystemError.NoSpaceLeft,
              "Uploading file: no space left on device"
            )
          )
        )

      const result = await subject.uploadFiles({
        directory: DeviceDirectory.Music,
        filePaths: ["/usr/audio/file-1.mp3"],
      })

      expect(result).toEqual(
        Result.failed(
          new AppError(
            FilesManagerError.NotEnoughSpace,
            "Not enough space on your device"
          )
        )
      )
    })
  })
})

describe("Method: deleteFiles", () => {
  describe("When `FileDeleteCommand` returns `Result.success` object", () => {
    test("returns success result object with deleted path", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fileDeleteCommand.exec = jest
        .fn()
        .mockResolvedValueOnce(Result.success(undefined))

      const result = await subject.deleteFiles(["/usr/audio/file-1.mp3"])

      expect(result).toEqual(Result.success(["/usr/audio/file-1.mp3"]))
    })
  })

  describe("When `FileDeleteCommand` returns `Result.failed` object", () => {
    test("returns failed result object with error", async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fileDeleteCommand.exec = jest
        .fn()
        .mockResolvedValueOnce(
          Result.failed(
            new AppError(
              DeviceFileSystemError.FileDeleteCommand,
              "Something went wrong"
            )
          )
        )

      const result = await subject.deleteFiles(["/usr/audio/file-1.mp3"])

      expect(result).toEqual(
        Result.failed(
          new AppError(FilesManagerError.DeleteFiles, "Delete failed")
        )
      )
    })
  })
})

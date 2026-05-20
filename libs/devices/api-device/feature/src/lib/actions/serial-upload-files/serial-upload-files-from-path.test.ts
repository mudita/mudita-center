/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { AppResultFactory } from "app-utils/models"
import { TransferFileFromPathEntry } from "devices/common/models"
import {
  AppFileSystem,
  ReadFileTransferMetadataErrorName,
} from "app-utils/renderer"
import { prePostFileTransfer } from "../../api/pre-post-file-transfer"
import { postFileTransfer } from "../../api/post-file-transfer"
import { serialUploadFilesFromPath } from "./serial-upload-files-from-path"

jest.mock("app-utils/renderer", () => ({
  AppFileSystem: {
    readFile: jest.fn(),
    fileStats: jest.fn(),
    calculateFileCrc32: jest.fn(),
    readFileChunk: jest.fn(),
  },
  ReadFileTransferMetadataErrorName: {
    Aborted: "Aborted",
    FileReadError: "FileReadError",
    Crc32Error: "Crc32Error",
  },
}))

jest.mock("../../api/pre-post-file-transfer")
jest.mock("../../api/post-file-transfer")
jest.mock("../../api/post-entity-data", () => ({
  postEntityData: jest.fn(),
}))
jest.mock("../../api/delete-file-transfer", () => ({
  deleteFileTransfer: jest.fn(),
}))

describe("serialUploadFilesFromPath", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("uses base64 payload for transfer integrity and raw file size for progress", async () => {
    ;(AppFileSystem.readFile as jest.Mock).mockResolvedValue(
      AppResultFactory.success("QUJD")
    )
    ;(AppFileSystem.calculateFileCrc32 as jest.Mock).mockResolvedValue(
      AppResultFactory.success("deadbeef")
    )
    ;(AppFileSystem.fileStats as jest.Mock).mockResolvedValue(
      AppResultFactory.success({ size: 3 })
    )
    ;(prePostFileTransfer as jest.Mock).mockResolvedValue({
      ok: true,
      body: {
        transferId: 7,
        chunkSize: 2,
      },
    })
    ;(postFileTransfer as jest.Mock).mockResolvedValue({
      ok: true,
      body: {
        transferId: 7,
        chunkNumber: 1,
      },
    })

    const onProgress = jest.fn()
    const files: TransferFileFromPathEntry[] = [
      {
        id: "/source/a.bin",
        source: {
          type: "fileLocation",
          fileLocation: {
            absolute: true,
            fileAbsolutePath: "/source/a.bin",
          },
        },
        target: {
          type: "path",
          path: "/storage/emulated/0/a.bin",
        },
      },
    ]

    const result = await serialUploadFilesFromPath({
      device: {} as ApiDevice,
      files,
      abortController: new AbortController(),
      onProgress,
    })

    expect(result.ok).toBe(true)
    expect(result.data?.failed).toEqual([])

    expect(prePostFileTransfer).toHaveBeenCalledWith(expect.anything(), {
      filePath: "/storage/emulated/0/a.bin",
      fileSize: 4,
      crc32: "deadbeef",
    })

    expect(postFileTransfer).toHaveBeenCalledTimes(2)
    expect(postFileTransfer).toHaveBeenNthCalledWith(1, expect.anything(), {
      transferId: 7,
      chunkNumber: 1,
      data: "QU",
    })
    expect(postFileTransfer).toHaveBeenNthCalledWith(2, expect.anything(), {
      transferId: 7,
      chunkNumber: 2,
      data: "JD",
    })

    const lastProgress = onProgress.mock.calls.at(-1)?.[0]
    expect(lastProgress).toEqual({
      progress: 100,
      loaded: 3,
      total: 3,
    })

    expect(AppFileSystem.readFileChunk).not.toHaveBeenCalled()
  })

  test("maps metadata preparation errors to transfer failed list", async () => {
    ;(AppFileSystem.readFile as jest.Mock).mockResolvedValue(
      AppResultFactory.failed(new Error("read-failed"))
    )

    const result = await serialUploadFilesFromPath({
      device: {} as ApiDevice,
      files: [
        {
          id: "/source/a.bin",
          source: {
            type: "fileLocation",
            fileLocation: {
              absolute: true,
              fileAbsolutePath: "/source/a.bin",
            },
          },
          target: {
            type: "path",
            path: "/storage/emulated/0/a.bin",
          },
        },
      ],
      abortController: new AbortController(),
    })

    expect(result.ok).toBe(true)
    expect(result.data?.failed).toEqual([
      {
        id: "/source/a.bin",
        errorName: ReadFileTransferMetadataErrorName.FileReadError,
      },
    ])
    expect(prePostFileTransfer).not.toHaveBeenCalled()
    expect(postFileTransfer).not.toHaveBeenCalled()
  })
})

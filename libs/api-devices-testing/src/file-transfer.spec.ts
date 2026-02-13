/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { crc32 } from "node:zlib"
import { readFileSync } from "fs-extra"
import {
  buildFileTransferDeleteRequest,
  buildFileTransferPostRequest,
  buildPreFileTransferPostRequest,
  PreFileTransferPostResponseValidator,
} from "devices/api-device/models"
import { execPromise } from "app-utils/main"
import { ApiDeviceTestService } from "./helpers/api-device-test-service"
import { delay } from "app-utils/common"

let service: ApiDeviceTestService
const validTargetPath = "/storage/emulated/0/testfile"
const invalidTargetPath = "/storage/emulated/1/testfile"
const sourcePath = path.resolve(__dirname, "./test-files/sample.png")

describe("File transfer", () => {
  beforeAll(async () => {
    service = new ApiDeviceTestService()
  }, 30_000)

  beforeEach(async () => {
    await service.init()
  }, 30_000)

  afterEach(async () => {
    await removeFile(validTargetPath)
    await service.reset()
  }, 30_000)

  it("should send file into device and return valid responses", async () => {
    let transferId = -1

    const file = readFileSync(sourcePath, {
      encoding: "base64",
    })

    const crc = (crc32(file) >>> 0).toString(16).toLowerCase().padStart(8, "0")
    const fileSize = file.length

    let preTransferResponse = await service.request(
      buildPreFileTransferPostRequest({
        filePath: validTargetPath,
        fileSize: fileSize,
        crc32: crc,
      })
    )

    while (preTransferResponse.status === 206) {
      console.log(`Pre-transfer check returned 206, retrying...`)
      await delay(500)
      preTransferResponse = await service.request(
        buildPreFileTransferPostRequest({
          filePath: validTargetPath,
          fileSize: fileSize,
          crc32: crc,
        })
      )
    }

    expect(preTransferResponse.status).toBe(200)

    if (preTransferResponse.status === 200) {
      const preTransferResponseData =
        PreFileTransferPostResponseValidator.parse(preTransferResponse.body)

      const chunkSize = preTransferResponseData.chunkSize
      const fileChunksCount = Math.ceil(fileSize / chunkSize)

      for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
        transferId = preTransferResponseData.transferId
        const data = file.slice(
          chunkNumber * chunkSize,
          (chunkNumber + 1) * chunkSize
        )
        const fileTransferResponse = await service.request(
          buildFileTransferPostRequest({
            transferId: transferId,
            chunkNumber: chunkNumber + 1,
            data,
          })
        )

        if (chunkNumber === fileChunksCount - 1) {
          expect(fileTransferResponse.status).toBe(200)
        } else {
          expect(fileTransferResponse.status).toBe(206)
        }
      }
      const isFilePresent = await isFileExists(validTargetPath)
      expect(isFilePresent).toBe(true)
    }
  }, 30000)

  it("should return error response for invalid targetPath", async () => {
    let transferId = -1

    const file = readFileSync(sourcePath, {
      encoding: "base64",
    })

    const crc = (crc32(file) >>> 0).toString(16).toLowerCase().padStart(8, "0")
    const fileSize = file.length

    let preTransferResponse = await service.request(
      buildPreFileTransferPostRequest({
        filePath: invalidTargetPath,
        fileSize: fileSize,
        crc32: crc,
      })
    )

    while (preTransferResponse.status === 206) {
      console.log(`Pre-transfer check returned 206, retrying...`)
      await delay(500)
      preTransferResponse = await service.request(
        buildPreFileTransferPostRequest({
          filePath: invalidTargetPath,
          fileSize: fileSize,
          crc32: crc,
        })
      )
    }

    expect(preTransferResponse.status).toBe(500)

    if (preTransferResponse.status === 200) {
      const preTransferResponseData =
        PreFileTransferPostResponseValidator.parse(preTransferResponse.body)

      const chunkSize = preTransferResponseData.chunkSize
      const fileChunksCount = Math.ceil(fileSize / chunkSize)

      for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
        transferId = preTransferResponseData.transferId
        const data = file.slice(
          chunkNumber * chunkSize,
          (chunkNumber + 1) * chunkSize
        )
        const fileTransferResponse = await service.request(
          buildFileTransferPostRequest({
            transferId: transferId,
            chunkNumber: chunkNumber + 1,
            data,
          })
        )

        expect(fileTransferResponse.status).toBe(200)
      }
      const isFilePresent = await isFileExists(invalidTargetPath)
      expect(isFilePresent).toBe(false)
    }
  }, 30000)

  it("file transfer delete should return success with 200 status for valid targetPath", async () => {
    let transferId = -1

    const file = readFileSync(sourcePath, {
      encoding: "base64",
    })

    const crc = (crc32(file) >>> 0).toString(16).toLowerCase().padStart(8, "0")
    const fileSize = file.length

    let preTransferResponse = await service.request(
      buildPreFileTransferPostRequest({
        filePath: validTargetPath,
        fileSize: fileSize,
        crc32: crc,
      })
    )

    while (preTransferResponse.status === 206) {
      console.log(`Pre-transfer check returned 206, retrying...`)
      await delay(500)
      preTransferResponse = await service.request(
        buildPreFileTransferPostRequest({
          filePath: validTargetPath,
          fileSize: fileSize,
          crc32: crc,
        })
      )
    }

    expect(preTransferResponse.status).toBe(200)

    if (preTransferResponse.status === 200) {
      const preTransferResponseData =
        PreFileTransferPostResponseValidator.parse(preTransferResponse.body)

      const chunkSize = preTransferResponseData.chunkSize
      const fileChunksCount = Math.ceil(fileSize / chunkSize)

      for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
        transferId = preTransferResponseData.transferId
        const data = file.slice(
          chunkNumber * chunkSize,
          (chunkNumber + 1) * chunkSize
        )
        const fileTransferResponse = await service.request(
          buildFileTransferPostRequest({
            transferId: transferId,
            chunkNumber: chunkNumber + 1,
            data,
          })
        )

        if (chunkNumber === fileChunksCount - 1) {
          expect(fileTransferResponse.status).toBe(200)
        } else {
          expect(fileTransferResponse.status).toBe(206)
        }
      }
      const isFilePresent = await isFileExists(validTargetPath)
      expect(isFilePresent).toBe(true)
    }

    expect(transferId).toBeGreaterThan(-1)

    const deleteResult = await service.request(
      buildFileTransferDeleteRequest({
        fileTransferId: transferId,
      })
    )

    expect(deleteResult.status).toBe(200)
  }, 30000)

  it("file transfer delete should return success with 207 status for invalid targetPath", async () => {
    const deleteResult = await service.request(
      buildFileTransferDeleteRequest({
        fileTransferId: -10,
      })
    )
    expect(deleteResult.status).toBe(207)
  }, 30000)

  const removeFile = async (targetPath: string): Promise<void> => {
    try {
      const command = `adb shell rm ${targetPath}`
      await execPromise(command)
    } catch {
      return
    }
  }

  const isFileExists = async (targetPath: string): Promise<boolean> => {
    try {
      const command = `adb shell "[ -f ${targetPath} ] && echo 1 || echo 0"`
      const stdout = (await execPromise(command)) ?? ""
      return stdout.trim() === "1"
    } catch {
      return false
    }
  }
})

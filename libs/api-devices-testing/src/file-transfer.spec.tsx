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
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext
const validTargetPath = "/storage/emulated/0/testfile"
const invalidTargetPath = "/storage/emulated/1/testfile"
const sourcePath = path.resolve(__dirname, "./test-files/sample.png")

describe("File transfer", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
  }, 30_000)

  afterEach(async () => {
    await removeFile(validTargetPath)
    await apiDeviceContext.reset()
  }, 30_000)

  it("should send file into device and return valid responses", async () => {
    await sendFile(sourcePath, validTargetPath, true)
  }, 30000)

  it("should return error response for invalid targetPath", async () => {
    await sendFile(sourcePath, invalidTargetPath, false)
  }, 30000)

  it("file transfer delete should return success with 200 status for valid targetPath", async () => {
    const { service, deviceId } = apiDeviceContext
    const transferId = await sendFile(sourcePath, validTargetPath, true)
    expect(transferId).toBeGreaterThan(-1)
    const deleteResult = await service.request(
      deviceId,
      buildFileTransferDeleteRequest({
        fileTransferId: transferId,
      })
    )

    expect(deleteResult.status).toBe(200)
  }, 30000)

  it("file transfer delete should return success with 207 status for invalid targetPath", async () => {
    const { service, deviceId } = apiDeviceContext
    const deleteResult = await service.request(
      deviceId,
      buildFileTransferDeleteRequest({
        fileTransferId: -10,
      })
    )
    expect(deleteResult.status).toBe(207)
  }, 30000)

  const sendFile = async (
    sourceFile: string,
    targetPath: string,
    expectedResult: boolean
  ): Promise<number> => {
    const { service, deviceId } = apiDeviceContext
    let transferId = -1

    const file = readFileSync(sourceFile, {
      encoding: "base64",
    })

    const crc = (crc32(file) >>> 0).toString(16).toLowerCase().padStart(8, "0")
    const fileSize = file.length

    const preTransferResponse = await service.request(
      deviceId,
      buildPreFileTransferPostRequest({
        filePath: targetPath,
        fileSize: fileSize,
        crc32: crc,
      })
    )
    expect(preTransferResponse.status).toBe(expectedResult ? 200 : 500)

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
          deviceId,
          buildFileTransferPostRequest({
            transferId: transferId,
            chunkNumber: chunkNumber + 1,
            data,
          })
        )

        // expect(fileTransferResponse.status).toBe(200)
      }
      const isFilePresent = await isFileExists(targetPath)
      expect(isFilePresent).toBe(expectedResult)
    }
    return transferId
  }

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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { setActiveDevice } from "./helpers/protocol-validator"
import { APIFileTransferService, ServiceBridge } from "Libs/device/feature/src"
import * as path from "path"
import { exec } from "child_process"
import util from "util"
const execPromise = util.promisify(exec)

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

let deviceProtocol: DeviceProtocol
const validTargetPath = "/storage/emulated/0/testfile"
const invalidTargetPath = "/storage/emulated/1/testfile"
const sourcePath = path.resolve(__dirname, "./test-files/sample.png")

describe("File transfer", () => {
  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await deviceProtocol.activeDevice?.disconnect()
  })

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await removeFile(validTargetPath)
    await deviceProtocol?.activeDevice?.disconnect()
  }, 10000)

  it("should send file into device and return valid responses", async () => {
    const serviceBridge = new ServiceBridge()
    const apiTransferService = new APIFileTransferService(
      deviceProtocol,
      serviceBridge
    )
    await sendFile(apiTransferService, sourcePath, validTargetPath, true)
  }, 30000)

  it("should return error response for invalid targetPath", async () => {
    const serviceBridge = new ServiceBridge()
    const apiTransferService = new APIFileTransferService(
      deviceProtocol,
      serviceBridge
    )
    await sendFile(apiTransferService, sourcePath, invalidTargetPath, false)
  }, 30000)

  it("file transfer delete should return success with 200 status for valid targetPath", async () => {
    const serviceBridge = new ServiceBridge()
    const apiTransferService = new APIFileTransferService(
      deviceProtocol,
      serviceBridge
    )
    const transferId = await sendFile(
      apiTransferService,
      sourcePath,
      validTargetPath,
      true
    )
    expect(transferId).toBeGreaterThan(-1)
    const deleteResult = await apiTransferService.transferSendDelete({
      transferId,
    })
    expect(deleteResult.ok).toBeTruthy()
    if (deleteResult.ok) {
      expect(deleteResult.data.status).toBe(200)
    }
  }, 30000)

  it("file transfer delete should return success with 207 status for invalid targetPath", async () => {
    const serviceBridge = new ServiceBridge()
    const apiTransferService = new APIFileTransferService(
      deviceProtocol,
      serviceBridge
    )
    const deleteResult = await apiTransferService.transferSendDelete({
      transferId: -10,
    })
    expect(deleteResult.ok).toBeTruthy()
    if (deleteResult.ok) {
      expect(deleteResult.data.status).toBe(207)
    }
  }, 30000)

  async function sendFile(
    apiTransferService: APIFileTransferService,
    sourceFile: string,
    targetPath: string,
    expectedResult: boolean
  ): Promise<number> {
    const preTransferResponse = await apiTransferService.preTransferSend({
      targetPath,
      source: { path: sourceFile },
    })
    let transferId = -1
    expect(preTransferResponse.ok).toBe(expectedResult)
    if (preTransferResponse.ok) {
      for (let i = 1; i <= preTransferResponse.data.chunksCount; i++) {
        transferId = preTransferResponse.data.transferId
        const fileTransferResponse = await apiTransferService.transferSend({
          transferId: transferId,
          chunkNumber: i,
          repeats: 0,
          maxRepeats: 0,
        })
        expect(fileTransferResponse.ok).toBe(expectedResult)
      }
      const isFilePresent = await isFileExists(targetPath)
      expect(isFilePresent).toBe(expectedResult)
    }
    return transferId
  }

  async function removeFile(targetPath: string): Promise<void> {
    try {
      const command = `adb shell rm ${targetPath}`
      await execPromise(command)
    } catch {
      return
    }
  }

  async function isFileExists(targetPath: string): Promise<boolean> {
    try {
      const command = `adb shell "[ -f ${targetPath} ] && echo 1 || echo 0"`
      const { stdout } = await execPromise(command)
      return stdout.trim() == "1"
    } catch {
      return false
    }
  }
})

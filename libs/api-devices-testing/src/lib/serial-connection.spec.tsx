/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { ApiTestToolsService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"

jest.mock("shared/utils", () => {
  return {
    callRenderer: () => {},
    delay: () => {
      return new Promise((resolve) => setTimeout(resolve, 500))
    },
  }
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

describe("Serial port test", () => {
  const SERIAL_PORT_DATA_SIZE = 14336
  const SERIAL_PORT_REQUEST_COUNTER = 100
  let deviceProtocol: DeviceProtocol

  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it(`should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`, async () => {
    for (let i = 1; i <= SERIAL_PORT_REQUEST_COUNTER; i++) {
      const sampleData = generateRandomAsciiString(SERIAL_PORT_DATA_SIZE)
      const service = new ApiTestToolsService(deviceProtocol)
      const response = await service.sendTestData({ data: sampleData })

      expect(response.ok).toBeTruthy()
      if (!response.ok) {
        return
      }

      expect(response.data.data).toBe(sampleData)
      expect(response.data.bytesCount).toEqual(sampleData.length)
    }
  }, 60000)
})

function generateRandomAsciiString(length: number): string {
  const maxChunkSize = 65536
  const bytes = new Uint8Array(length)
  for (let offset = 0; offset < length; offset += maxChunkSize) {
    const chunkSize = Math.min(maxChunkSize, length - offset)
    const chunk = new Uint8Array(chunkSize)
    crypto.getRandomValues(chunk)
    bytes.set(chunk, offset)
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from(bytes, (byte) => chars[byte % chars.length]).join("")
}

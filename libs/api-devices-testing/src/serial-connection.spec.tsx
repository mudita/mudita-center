/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiTestToolsGetResponseValidator,
  buildApiTestToolsGetRequestValidator,
} from "devices/api-device/models"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

const SERIAL_PORT_DATA_SIZE = 14336
const SERIAL_PORT_REQUEST_COUNTER = 100

let apiDeviceContext: ApiDeviceContext

describe("Serial port test", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it(`should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`, async () => {
    const { service, deviceId } = apiDeviceContext
    for (let i = 1; i <= SERIAL_PORT_REQUEST_COUNTER; i++) {
      const sampleData = generateRandomAsciiString(SERIAL_PORT_DATA_SIZE)

      const response = await service.request(
        deviceId,
        buildApiTestToolsGetRequestValidator({
          action: "send-serial-port-test-data",
          data: sampleData,
        })
      )

      expect(response.status).toBe(200)

      const apiTestToolsGetResponseData =
        ApiTestToolsGetResponseValidator.parse(response.body)

      expect(apiTestToolsGetResponseData.data).toBe(sampleData)
      expect(apiTestToolsGetResponseData.bytesCount).toEqual(sampleData.length)
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

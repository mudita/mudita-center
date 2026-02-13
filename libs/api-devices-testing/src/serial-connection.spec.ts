/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiTestToolsGetResponseValidator,
  buildApiTestToolsGetRequestValidator,
} from "devices/api-device/models"
import { getService } from "./helpers/api-device-test-service"
import { randomBytes } from "crypto"

const FACTOR = 8
const SERIAL_PORT_DATA_SIZE = 1024 * 14 * FACTOR // 14 336 * factor
const SERIAL_PORT_REQUEST_COUNTER = 100

const TEST_TIMEOUT = SERIAL_PORT_REQUEST_COUNTER * FACTOR * 300

describe("Serial port test", () => {
  // THIS MAY NOT WORK ON KOMPAKT WITH OS 1.4.0
  it(
    `should send data with only 0s via serial port and return the same data times`,
    async () => {
      const expectedData: string[] = []

      for (let i = 0; i < SERIAL_PORT_REQUEST_COUNTER; i++) {
        const data = "0".repeat(SERIAL_PORT_DATA_SIZE)
        expectedData.push(data)

        const response = await getService().request({
          ...buildApiTestToolsGetRequestValidator({
            action: "send-serial-port-test-data",
            data,
          }),
          options: { timeout: 5_000, retries: 3 },
        })

        const parsedResponse = ApiTestToolsGetResponseValidator.parse(
          response.body
        )
        expect(response.status).toBe(200)
        expect(parsedResponse.data).toBe(expectedData[i])
        expect(parsedResponse.bytesCount).toBe(expectedData[i].length)
      }
    },
    TEST_TIMEOUT
  )

  // THIS MAY NOT WORK ON KOMPAKT WITH OS 1.4.0
  it(
    `should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`,
    async () => {
      const expectedData: string[] = []

      for (let i = 0; i < SERIAL_PORT_REQUEST_COUNTER; i++) {
        const buf = randomBytes(SERIAL_PORT_DATA_SIZE)
        const data = buf.toString("hex").slice(0, SERIAL_PORT_DATA_SIZE)
        expectedData.push(data)

        const response = await getService().request({
          ...buildApiTestToolsGetRequestValidator({
            action: "send-serial-port-test-data",
            data,
          }),
          options: { timeout: 5_000, retries: 3 },
        })

        const parsedResponse = ApiTestToolsGetResponseValidator.parse(
          response.body
        )
        expect(response.status).toBe(200)
        expect(parsedResponse.data).toBe(expectedData[i])
        expect(parsedResponse.bytesCount).toBe(expectedData[i].length)
      }
    },
    TEST_TIMEOUT
  )

  it(
    "measures performance of serial port data transfer",
    async () => {
      const data = "a".repeat(SERIAL_PORT_DATA_SIZE)

      const startTime = Date.now()

      for (let i = 0; i < SERIAL_PORT_REQUEST_COUNTER; i++) {
        const response = await getService().request({
          ...buildApiTestToolsGetRequestValidator({
            action: "send-serial-port-test-data",
            data,
          }),
          options: { timeout: 5_000, retries: 3 },
        })

        expect(response.status).toBe(200)
      }

      const endTime = Date.now()
      const durationSeconds = (endTime - startTime) / 1000
      const totalBytes = SERIAL_PORT_DATA_SIZE * SERIAL_PORT_REQUEST_COUNTER
      const throughputMbps = (totalBytes * 8) / (durationSeconds * 1_000_000)

      console.log(`Total time: ${durationSeconds.toFixed(2)} seconds`)
      console.log(`Throughput: ${throughputMbps.toFixed(2)} Mbps`)
    },
    TEST_TIMEOUT
  )
})

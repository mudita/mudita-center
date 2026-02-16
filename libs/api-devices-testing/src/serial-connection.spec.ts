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
import semver from "semver/preload"

const FACTOR = 8
const SERIAL_PORT_DATA_SIZE = 1024 * 14 * FACTOR // 14 336 * factor
const SERIAL_PORT_REQUEST_COUNTER = 50

const TEST_TIMEOUT = SERIAL_PORT_REQUEST_COUNTER * FACTOR * 300

describe("Serial port test", () => {
  let osVersion: string | undefined = undefined

  const isKompaktLte140 = () => {
    return Boolean(osVersion && semver.lte(osVersion, "1.4.0"))
  }

  beforeAll(async () => {
    const apiConfig = await getService().getApiConfig()
    const osVersionMatch = apiConfig.osVersion.match(/((\d\.){2}\d)/g)

    osVersion = osVersionMatch ? osVersionMatch[0] : undefined
  })

  it(
    `should send data with only 0s via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`,
    async () => {
      if (isKompaktLte140()) {
        console.warn(
          "Test skipped because Mudita OS 1.4.0 or below was detected on Kompakt."
        )
        return
      }

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

  it(
    `should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`,
    async () => {
      const expectedData: string[] = []

      let dataSize = SERIAL_PORT_DATA_SIZE

      if (isKompaktLte140()) {
        dataSize = SERIAL_PORT_DATA_SIZE / FACTOR
        console.log(
          `Detected Kompakt OS version ${osVersion}. Reducing data size to ${dataSize}B.`
        )
      }

      for (let i = 0; i < SERIAL_PORT_REQUEST_COUNTER; i++) {
        const buf = randomBytes(dataSize)
        const data = buf.toString("base64").slice(0, dataSize)
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
})

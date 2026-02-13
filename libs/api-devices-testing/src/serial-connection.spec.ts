/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiTestToolsGetResponseValidator,
  buildApiTestToolsGetRequestValidator,
} from "devices/api-device/models"
import { ApiDeviceTestService } from "./helpers/api-device-test-service"
import { randomBytes } from "crypto"
// import { delay } from "app-utils/common"

const FACTOR = 0.1
const SERIAL_PORT_DATA_SIZE = 1024 * 14 * FACTOR // 14 336 * factor
const SERIAL_PORT_REQUEST_COUNTER = 100

let service: ApiDeviceTestService

describe("Serial port test", () => {
  beforeAll(async () => {
    service = new ApiDeviceTestService()
  }, 30_000)

  beforeEach(async () => {
    await service.init()
  }, 30_000)

  afterEach(async () => {
    await service.reset()
  }, 30_000)

  it(`should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`, async () => {
    const expectedData: string[] = []

    const chars =
      "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 0; i < chars.length; i++) {
      const data = chars[i].repeat(SERIAL_PORT_DATA_SIZE)
      expectedData.push(data)

      const response = await service.request({
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
  }, 120_000)

  // it(`should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`, async () => {
  //   const expectedData: string[] = []
  //
  //   for (let i = 0; i < SERIAL_PORT_REQUEST_COUNTER; i++) {
  //     const buf = randomBytes(SERIAL_PORT_DATA_SIZE)
  //     const data = buf.toString("hex").slice(0, SERIAL_PORT_DATA_SIZE)
  //     expectedData.push(data)
  //
  //     const response = await service.request({
  //       ...buildApiTestToolsGetRequestValidator({
  //         action: "send-serial-port-test-data",
  //         data,
  //       }),
  //       options: { timeout: 5_000, retries: 3 },
  //     })
  //
  //     const parsedResponse = ApiTestToolsGetResponseValidator.parse(
  //       response.body
  //     )
  //     expect(response.status).toBe(200)
  //     expect(parsedResponse.data).toBe(expectedData[i])
  //     expect(parsedResponse.bytesCount).toBe(expectedData[i].length)
  //   }
  // }, 120_000)
})

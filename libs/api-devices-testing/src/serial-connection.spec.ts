/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  ApiTestToolsGetResponseValidator,
  buildApiTestToolsGetRequestValidator,
} from "devices/api-device/models"
import {
  changePortOptions,
  getApiDevice,
  service,
} from "./helpers/api-device-context"
import { randomBytes } from "crypto"

const SERIAL_PORT_DATA_SIZE = 1024 * 14 // 14336
const SERIAL_PORT_REQUEST_COUNTER = 50

let apiDevice: ApiDevice

describe("Serial port test", () => {
  beforeEach(async () => {
    apiDevice = await getApiDevice()
    await changePortOptions(apiDevice, {
      chunkSize: SERIAL_PORT_DATA_SIZE * 10,
    })
  }, 30_000)

  afterEach(() => {
    service.reset()
  })

  it(`should send data via serial port and return the same data ${SERIAL_PORT_REQUEST_COUNTER} times`, async () => {
    const expectedData: string[] = []

    for (let i = 0; i < SERIAL_PORT_REQUEST_COUNTER; i++) {
      const buf = randomBytes(SERIAL_PORT_DATA_SIZE)
      const data = buf.toString("hex").slice(0, SERIAL_PORT_DATA_SIZE)
      expectedData.push(data)

      const response = await service.request(apiDevice.id, {
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
  }, 60_000)
})

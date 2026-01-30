/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildOutboxGetRequest,
  OutboxResponseValidator,
} from "devices/api-device/models"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext

describe("Outbox", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it("should return valid outbox response for valid deviceId", async () => {
    const { deviceId, service } = apiDeviceContext
    const result = await service.request(deviceId, buildOutboxGetRequest())
    expect(result.status).toBe(200)
    const data = OutboxResponseValidator.parse(result.body)
    expect(data.features).toEqual(expect.any(Array))
    expect(data.entities).toEqual(expect.any(Array))
    expect(data.data).toEqual(expect.any(Array))
  })

  it("should return error outbox response for invalid deviceId", async () => {
    const { service } = apiDeviceContext
    await expect(
      service.request("invalid", buildOutboxGetRequest())
    ).rejects.toThrow("Device not found at id invalid.")
  })
})

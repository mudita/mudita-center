/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildOutboxGetRequest,
  OutboxResponseValidator,
} from "devices/api-device/models"
import { ApiDeviceTestService } from "./helpers/api-device-test-service"

let service: ApiDeviceTestService

describe("Outbox", () => {
  beforeAll(async () => {
    service = new ApiDeviceTestService()
  }, 30_000)

  beforeEach(async () => {
    await service.init()
  }, 30_000)

  afterEach(async () => {
    await service.reset()
  }, 30_000)

  it("should return valid outbox response for valid deviceId", async () => {
    const result = await service.request(buildOutboxGetRequest())
    expect(result.status).toBe(200)
    const data = OutboxResponseValidator.parse(result.body)
    expect(data.features).toEqual(expect.any(Array))
    expect(data.entities).toEqual(expect.any(Array))
    expect(data.data).toEqual(expect.any(Array))
  })
})

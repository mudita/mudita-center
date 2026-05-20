/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildOutboxGetRequest,
  OutboxResponseValidator,
} from "devices/api-device/models"
import { getService } from "./helpers/api-device-test-service"

describe("Outbox", () => {
  it("should return valid outbox response for valid deviceId", async () => {
    const result = await getService().request(buildOutboxGetRequest())
    expect(result.status).toBe(200)
    const data = OutboxResponseValidator.parse(result.body)
    expect(data.features).toEqual(expect.any(Array))
    expect(data.entities).toEqual(expect.any(Array))
    expect(data.data).toEqual(expect.any(Array))
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceTestService } from "./helpers/api-device-test-service"
import { waitFor } from "@testing-library/dom"

let service: ApiDeviceTestService

describe("Connection", () => {
  beforeAll(async () => {
    service = new ApiDeviceTestService()
  }, 30_000)

  beforeEach(async () => {
    await service.init()
  }, 30_000)

  afterEach(async () => {
    await service.reset()
  }, 30_000)

  it.each([{ vendorId: "3310", productId: "200a" }])(
    "should connect successfully",
    async ({ vendorId, productId }) => {
      await waitFor(() => {
        expect(service.apiDevice).toBeDefined()
        expect(service.apiDevice?.vendorId).toBe(vendorId)
        expect(service.apiDevice?.productId).toBe(productId)
      })
    }
  )
})

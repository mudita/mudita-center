/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { waitFor } from "@testing-library/dom"
import { getService } from "./helpers/api-device-test-service"

describe("Connection", () => {
  it.each([{ vendorId: "3310", productId: "200a" }])(
    "should connect successfully",
    async ({ vendorId, productId }) => {
      await waitFor(() => {
        expect(getService().apiDevice).toBeDefined()
        expect(getService().apiDevice?.vendorId?.toLowerCase()).toBe(vendorId)
        expect(getService().apiDevice?.productId?.toLowerCase()).toBe(productId)
      })
    }
  )
})

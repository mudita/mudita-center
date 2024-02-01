/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Outbox, OutboxValidator } from "./outbox"

const minimumOutboxConfig: Outbox = {
  data: [],
  features: [],
}

describe("OutboxValidator", () => {
  it("should return success when correct config is validated", () => {
    const outbox = { ...minimumOutboxConfig }
    const result = OutboxValidator.safeParse(outbox)
    expect(result.success).toBeTruthy()
  })
  it.each(["data", "features"])(
    "should return fail when %s is missing",
    (fieldName) => {
      const outbox: any = { ...minimumOutboxConfig }
      delete outbox[fieldName]
      const result = OutboxValidator.safeParse(outbox)
      expect(result.success).toBeFalsy()
    }
  )
})

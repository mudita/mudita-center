/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnalyticsService } from "./analytics.service"

describe("AnalyticsService", () => {
  it("should return status 200 when tracking is enabled", async () => {
    const service = new AnalyticsService({ trackingEnabled: true })
    const result = await service.track("test-event")
    expect(result?.status).toBe(200)
  })

  it("should return undefined when tracking is disabled", async () => {
    const service = new AnalyticsService({ trackingEnabled: false })
    const result = await service.track("test-event")
    expect(result).toBeUndefined()
  })
})

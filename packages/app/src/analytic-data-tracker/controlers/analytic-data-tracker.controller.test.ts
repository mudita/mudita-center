/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnalyticDataTrackerController } from "App/analytic-data-tracker/controlers/analytic-data-tracker.controller"
import { AnalyticDataTrackerClass } from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"

const tracker = {
  track: jest.fn(),
} as unknown as AnalyticDataTrackerClass

const subject = new AnalyticDataTrackerController(tracker)

describe("`AnalyticDataTrackerController`", () => {
  test("`track` return undefined", async () => {
    expect(await subject.track({})).toBeUndefined()
  })
})

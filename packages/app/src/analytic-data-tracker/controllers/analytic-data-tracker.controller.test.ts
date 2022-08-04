/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnalyticDataTrackerController } from "App/analytic-data-tracker/controllers/analytic-data-tracker.controller"
import { AnalyticDataTrackerClass } from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { VisitorMetadata } from "App/analytic-data-tracker/services"

const tracker = {
  track: jest.fn(),
  trackUnique: jest.fn(),
  toggleTracking: jest.fn(),
  setVisitorMetadata: jest.fn(),
} as unknown as AnalyticDataTrackerClass

const subject = new AnalyticDataTrackerController(tracker)

describe("`AnalyticDataTrackerController`", () => {
  test("`track` return undefined", async () => {
    expect(await subject.track({})).toBeUndefined()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(tracker.track).toHaveBeenCalled()
  })
  test("`trackUnique` return undefined", async () => {
    expect(await subject.trackUnique({})).toBeUndefined()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(tracker.trackUnique).toHaveBeenCalled()
  })
  test("`toggleTracking` return undefined", async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    expect(await subject.toggleTracking(false)).toBeUndefined()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(tracker.toggleTracking).toHaveBeenCalled()
  })
  test("`toggleTracking` return undefined", async () => {
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await subject.setVisitorMetadata({} as VisitorMetadata)
    ).toBeUndefined()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(tracker.setVisitorMetadata).toHaveBeenCalled()
  })
})

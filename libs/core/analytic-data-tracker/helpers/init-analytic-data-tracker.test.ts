/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initAnalyticDataTracker } from "Core/analytic-data-tracker/helpers/init-analytic-data-tracker"
import {
  setVisitorMetadataRequest,
  trackUniqueWithoutDeviceCheckRequest,
} from "Core/analytic-data-tracker/requests"

jest.mock("Core/analytic-data-tracker/requests/set-visitor-metadata.request")
jest.mock(
  "Core/analytic-data-tracker/requests/track-unique-without-device-check.request"
)

describe("`initAnalyticDataTracker`", () => {
  test("methods trigger `setVisitorMetadataRequest` and `trackUniqueWithoutDeviceCheckRequest`", async () => {
    await initAnalyticDataTracker()
    expect(setVisitorMetadataRequest).toHaveBeenCalled()
    expect(trackUniqueWithoutDeviceCheckRequest).toHaveBeenCalled()
  })
})

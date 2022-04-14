/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initAnalyticDataTracker } from "App/analytic-data-tracker/helpers/init-analytic-data-tracker"
import { setVisitorMetadataRequest, trackUniqueRequest } from "App/analytic-data-tracker/requests"

jest.mock("App/analytic-data-tracker/requests/set-visitor-metadata.request")
jest.mock("App/analytic-data-tracker/requests/track-unique.request")

describe("`initAnalyticDataTracker`", () => {
  test("methods trigger `setVisitorMetadataRequest` and `trackUniqueRequest`", async () => {
    await initAnalyticDataTracker()
    expect(setVisitorMetadataRequest).toHaveBeenCalled()
    expect(trackUniqueRequest).toHaveBeenCalled()
  })
})

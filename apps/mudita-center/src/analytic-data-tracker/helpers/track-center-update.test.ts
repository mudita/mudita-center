/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackRequest } from "App/analytic-data-tracker/requests"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"
import {
  trackCenterUpdate,
  TrackCenterUpdateOptions,
  TrackCenterUpdateState,
} from "App/analytic-data-tracker/helpers/track-center-update"

jest.mock("App/analytic-data-tracker/requests/track.request")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`trackCenterUpdate`", () => {
  describe("when state is Download", () => {
    const options: TrackCenterUpdateOptions = {
      state: TrackCenterUpdateState.Download,
      fromCenterVersion: "1.0.0",
      toCenterVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackCenterUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.CenterUpdateDownload,
        e_a: options.toCenterVersion,
        e_n: options.fromCenterVersion,
      })
    })
  })

  describe("when state is Start", () => {
    const options: TrackCenterUpdateOptions = {
      state: TrackCenterUpdateState.Start,
      fromCenterVersion: "1.0.0",
      toCenterVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackCenterUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.CenterUpdateStart,
        e_a: options.toCenterVersion,
        e_n: options.fromCenterVersion,
      })
    })
  })

  describe("when state is Fail", () => {
    const options: TrackCenterUpdateOptions = {
      state: TrackCenterUpdateState.Fail,
      fromCenterVersion: "1.0.0",
      toCenterVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackCenterUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.CenterUpdateFail,
        e_a: options.toCenterVersion,
        e_n: options.fromCenterVersion,
      })
    })
  })
})

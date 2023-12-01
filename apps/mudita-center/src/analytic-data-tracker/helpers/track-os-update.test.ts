/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  trackOsUpdate,
  TrackOsUpdateState,
  TrackOsUpdateOptions,
} from "App/analytic-data-tracker/helpers/track-os-update"
import { DeviceType } from "App/device/constants"
import { trackRequest } from "App/analytic-data-tracker/requests"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"

jest.mock("App/analytic-data-tracker/requests/track.request")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`trackOsUpdate`", () => {
  describe("when `deviceType` is a `MuditaHarmony` and `state` is Start", () => {
    const options: TrackOsUpdateOptions = {
      deviceType: DeviceType.MuditaHarmony,
      state: TrackOsUpdateState.Start,
      fromOsVersion: "1.0.0",
      toOsVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyUpdateStart,
        e_a: options.toOsVersion,
        e_n: options.fromOsVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaHarmony` and `state` is Success", () => {
    const options: TrackOsUpdateOptions = {
      deviceType: DeviceType.MuditaHarmony,
      state: TrackOsUpdateState.Success,
      fromOsVersion: "1.0.0",
      toOsVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyUpdateSuccess,
        e_a: options.toOsVersion,
        e_n: options.fromOsVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaHarmony` and `state` is Fail", () => {
    const options: TrackOsUpdateOptions = {
      deviceType: DeviceType.MuditaHarmony,
      state: TrackOsUpdateState.Fail,
      fromOsVersion: "1.0.0",
      toOsVersion: "2.0.0",
    }
    test("`trackRequest` is called with properly argument", async () => {
      await trackOsUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyUpdateFail,
        e_a: options.toOsVersion,
        e_n: options.fromOsVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `state` is Start", () => {
    const options: TrackOsUpdateOptions = {
      deviceType: DeviceType.MuditaPure,
      state: TrackOsUpdateState.Start,
      fromOsVersion: "1.0.0",
      toOsVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureUpdateStart,
        e_a: options.toOsVersion,
        e_n: options.fromOsVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `state` is Success", () => {
    const options: TrackOsUpdateOptions = {
      deviceType: DeviceType.MuditaPure,
      state: TrackOsUpdateState.Success,
      fromOsVersion: "1.0.0",
      toOsVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureUpdateSuccess,
        e_a: options.toOsVersion,
        e_n: options.fromOsVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `state` is Fail", () => {
    const options: TrackOsUpdateOptions = {
      deviceType: DeviceType.MuditaPure,
      state: TrackOsUpdateState.Fail,
      fromOsVersion: "1.0.0",
      toOsVersion: "2.0.0",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsUpdate(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureUpdateFail,
        e_a: options.toOsVersion,
        e_n: options.fromOsVersion,
      })
    })
  })
})

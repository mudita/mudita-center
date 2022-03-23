/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import {
  trackOsVersion,
  TrackOsVersionOptions,
} from "App/analytic-data-tracker/helpers/track-os-version"
import { trackRequest } from "App/analytic-data-tracker/requests"
import {
  TrackEventCategory,
  TrackEventDimension,
} from "App/analytic-data-tracker/constants"
import { getTrackOsVersionCache } from "App/analytic-data-tracker/helpers/track-os-version-cache"

jest.mock("App/analytic-data-tracker/requests/track.request")
jest.mock("App/analytic-data-tracker/helpers/track-os-version-cache")

beforeEach(() => {
  jest.resetAllMocks()
  ;(getTrackOsVersionCache as unknown as jest.Mock).mockReturnValue({
    osVersion: "",
    serialNumber: "",
  })
})

describe("`trackOsVersion`", () => {
  describe("when `deviceType` is a `MuditaHarmony` and `serialNumber` exist", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaHarmony,
      osVersion: "1.0.0",
      serialNumber: "1UB13213MN14K1",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledWith({
        _id: options.serialNumber,
        e_c: TrackEventCategory.HarmonyVersion,
        e_a: options.osVersion,
        [TrackEventDimension.HarmonyVersion]: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `serialNumber` exist", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: "1UB13213MN14K1",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledWith({
        _id: options.serialNumber,
        e_c: TrackEventCategory.PureVersion,
        e_a: options.osVersion,
        [TrackEventDimension.PureVersion]: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaHarmony` and `serialNumber` is undefined", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaHarmony,
      osVersion: "1.0.0",
      serialNumber: undefined,
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyVersion,
        e_a: options.osVersion,
        [TrackEventDimension.HarmonyVersion]: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `serialNumber` is undefined", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: undefined,
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureVersion,
        e_a: options.osVersion,
        [TrackEventDimension.PureVersion]: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaHarmony` and `serialNumber` is empty", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaHarmony,
      osVersion: "1.0.0",
      serialNumber: "",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyVersion,
        e_a: options.osVersion,
        [TrackEventDimension.HarmonyVersion]: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `serialNumber` is empty", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: "",
    }

    test("`trackRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureVersion,
        e_a: options.osVersion,
        [TrackEventDimension.PureVersion]: options.osVersion,
      })
    })
  })

  describe("when `osVersion` and `serialNumber` is the same that previous request", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: "",
    }

    test("`trackRequest` is called again", async () => {
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledTimes(1)
      await trackOsVersion(options)
      expect(trackRequest).toHaveBeenCalledTimes(1)
    })
  })
})

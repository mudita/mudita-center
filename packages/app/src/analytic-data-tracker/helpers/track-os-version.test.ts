/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import {
  trackOsVersion,
  TrackOsVersionOptions,
} from "App/analytic-data-tracker/helpers/track-os-version"
import { trackUniqueRequest } from "App/analytic-data-tracker/requests"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"

jest.mock("App/analytic-data-tracker/requests/track-unique.request")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`trackOsVersion`", () => {
  describe("when `deviceType` is a `MuditaHarmony` and `serialNumber` exist", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaHarmony,
      osVersion: "1.0.0",
      serialNumber: "1UB13213MN14K1",
    }

    test("`trackUniqueRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackUniqueRequest).toHaveBeenCalledWith({
        _id: options.serialNumber,
        e_c: TrackEventCategory.HarmonyVersion,
        e_a: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `serialNumber` exist", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: "1UB13213MN14K1",
    }

    test("`trackUniqueRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackUniqueRequest).toHaveBeenCalledWith({
        _id: options.serialNumber,
        e_c: TrackEventCategory.PureVersion,
        e_a: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaHarmony` and `serialNumber` is undefined", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaHarmony,
      osVersion: "1.0.0",
      serialNumber: undefined,
    }

    test("`trackUniqueRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackUniqueRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyVersion,
        e_a: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `serialNumber` is undefined", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: undefined,
    }

    test("`trackUniqueRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackUniqueRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureVersion,
        e_a: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaHarmony` and `serialNumber` is empty", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaHarmony,
      osVersion: "1.0.0",
      serialNumber: "",
    }

    test("`trackUniqueRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackUniqueRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.HarmonyVersion,
        e_a: options.osVersion,
      })
    })
  })

  describe("when `deviceType` is a `MuditaPure` and `serialNumber` is empty", () => {
    const options: TrackOsVersionOptions = {
      deviceType: DeviceType.MuditaPure,
      osVersion: "1.0.0",
      serialNumber: "",
    }

    test("`trackUniqueRequest` is called with properly argument", async () => {
      await trackOsVersion(options)
      expect(trackUniqueRequest).toHaveBeenCalledWith({
        e_c: TrackEventCategory.PureVersion,
        e_a: options.osVersion,
      })
    })
  })
})

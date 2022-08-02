/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { initialState } from "App/settings/reducers"
import { getDeviceLatestVersion } from "App/settings/selectors/get-device-lowest-version.selector"

const defaultState = {
  device: {
    deviceType: null,
  },
  settings: initialState,
} as ReduxRootState

describe("When `deviceType` is equal to `null`", () => {
  test("returns `undefined`", () => {
    expect(getDeviceLatestVersion(defaultState)).toBeUndefined()
  })
})

describe("When `lowestSupportedVersions` is equal to `undefined`", () => {
  test("returns `undefined`", () => {
    expect(
      getDeviceLatestVersion({
        ...defaultState,
        settings: {
          ...initialState,
          lowestSupportedVersions: undefined,
        },
      })
    ).toBeUndefined()
  })
})

describe("When `lowestSupportedProductVersion` is equal to `undefined`", () => {
  test("returns `undefined`", () => {
    expect(
      getDeviceLatestVersion({
        ...defaultState,
        settings: {
          ...initialState,
          lowestSupportedVersions: {
            lowestSupportedCenterVersion: "1.0.0",
            lowestSupportedProductVersion: undefined as unknown as Record<
              DeviceType,
              string
            >,
          },
        },
      })
    ).toBeUndefined()
  })
})

describe("When `deviceType` and `lowestSupportedVersions` has been provided", () => {
  test("returns lowest version for connected product", () => {
    expect(
      getDeviceLatestVersion({
        ...defaultState,
        device: {
          ...defaultState.device,
          deviceType: DeviceType.MuditaHarmony,
        },
        settings: {
          ...initialState,
          lowestSupportedVersions: {
            lowestSupportedCenterVersion: "1.0.0",
            lowestSupportedProductVersion: {
              MuditaHarmony: "1.0.0",
              MuditaPure: "2.0.0",
            },
          },
        },
      })
    ).toEqual("1.0.0")
    expect(
      getDeviceLatestVersion({
        ...defaultState,
        device: {
          ...defaultState.device,
          deviceType: DeviceType.MuditaPure,
        },
        settings: {
          ...initialState,
          lowestSupportedVersions: {
            lowestSupportedCenterVersion: "1.0.0",
            lowestSupportedProductVersion: {
              MuditaHarmony: "1.0.0",
              MuditaPure: "2.0.0",
            },
          },
        },
      })
    ).toEqual("2.0.0")
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "App/__deprecated__/renderer/store"
import { isDevModeEnabled, toggleDevMode } from "./dev-mode.helpers"

describe("Function: isDevModeEnabled", () => {
  test("returns current devMode state", () => {
    expect(isDevModeEnabled()).toBeFalsy()
    store.dispatch.devMode.enableDevMode()
    expect(isDevModeEnabled()).toBeTruthy()
  })
})

describe("Function: toggleDevMode", () => {
  test("changing devMode state to `true` if it's disabled", () => {
    store.dispatch.devMode.disableDevMode()
    expect(store.getState().devMode.enabled).toBeFalsy()
    toggleDevMode()
    expect(store.getState().devMode.enabled).toBeTruthy()
  })

  test("changing devMode state to `false` if it's enabled and", () => {
    store.dispatch.devMode.enableDevMode()
    expect(store.getState().devMode.enabled).toBeTruthy()
    toggleDevMode()
    expect(store.getState().devMode.enabled).toBeFalsy()
  })
})

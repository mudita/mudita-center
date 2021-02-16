/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import devMode from "App/dev-mode/store/dev-mode"

let store = init({
  models: { devMode },
})

// Cleans store after each test
beforeEach(() => {
  store = init({
    models: { devMode },
  })
})

test("have default state properly defined", () => {
  const { getState } = store

  expect(getState().devMode).toMatchObject({
    enabled: false,
    phoneSimulation: false,
  })
})

test("properly enables dev mode", () => {
  const { dispatch, getState } = store

  expect(getState().devMode).toMatchObject({ enabled: false })
  dispatch.devMode.enableDevMode()
  expect(getState().devMode).toMatchObject({ enabled: true })
})

test("properly disables dev mode", () => {
  const { dispatch, getState } = store

  dispatch.devMode.enableDevMode()
  expect(getState().devMode).toMatchObject({ enabled: true })
  dispatch.devMode.disableDevMode()
  expect(getState().devMode).toMatchObject({ enabled: false })
})

test("properly enables phone simulation mode", () => {
  const { dispatch, getState } = store

  expect(getState().devMode).toMatchObject({ phoneSimulation: false })
  dispatch.devMode.enablePhoneSimulation()
  expect(getState().devMode).toMatchObject({ phoneSimulation: true })
})

test("properly disables phone simulation mode", () => {
  const { dispatch, getState } = store

  dispatch.devMode.enablePhoneSimulation()
  expect(getState().devMode).toMatchObject({ phoneSimulation: true })
  dispatch.devMode.disablePhoneSimulation()
  expect(getState().devMode).toMatchObject({ phoneSimulation: false })
})

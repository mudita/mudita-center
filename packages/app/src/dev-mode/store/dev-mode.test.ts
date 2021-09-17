/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
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
  expect(store.getState().devMode).toMatchObject({
    enabled: false,
    phoneSimulation: false,
    harmonySimulation: false,
  })
})

test("properly enables dev mode", () => {
  expect(store.getState().devMode).toMatchObject({ enabled: false })
  store.dispatch.devMode.enableDevMode()
  expect(store.getState().devMode).toMatchObject({ enabled: true })
})

test("properly disables dev mode", () => {
  store.dispatch.devMode.enableDevMode()
  expect(store.getState().devMode).toMatchObject({ enabled: true })
  store.dispatch.devMode.disableDevMode()
  expect(store.getState().devMode).toMatchObject({ enabled: false })
})

test("properly enables phone simulation mode", () => {
  expect(store.getState().devMode).toMatchObject({ phoneSimulation: false })
  store.dispatch.devMode.enablePhoneSimulation()
  expect(store.getState().devMode).toMatchObject({ phoneSimulation: true })
})

test("properly disables phone simulation mode", () => {
  store.dispatch.devMode.enablePhoneSimulation()
  expect(store.getState().devMode).toMatchObject({ phoneSimulation: true })
  store.dispatch.devMode.disablePhoneSimulation()
  expect(store.getState().devMode).toMatchObject({ phoneSimulation: false })
})

test("properly enables harmony simulation mode", () => {
  expect(store.getState().devMode).toMatchObject({ harmonySimulation: false })
  store.dispatch.devMode.enableHarmonySimulation()
  expect(store.getState().devMode).toMatchObject({ harmonySimulation: true })
})

test("properly disables harmony simulation mode", () => {
  store.dispatch.devMode.enableHarmonySimulation()
  expect(store.getState().devMode).toMatchObject({ harmonySimulation: true })
  store.dispatch.devMode.disableHarmonySimulation()
  expect(store.getState().devMode).toMatchObject({ harmonySimulation: false })
})

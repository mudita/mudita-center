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

  expect(getState().devMode).toMatchObject({ devModeEnabled: false })
})

test("properly toggle dev mode state", () => {
  const { dispatch, getState } = store

  expect(getState().devMode).toMatchObject({ devModeEnabled: false })
  dispatch.devMode.toggle()
  expect(getState().devMode).toMatchObject({ devModeEnabled: true })
  dispatch.devMode.toggle()
  expect(getState().devMode).toMatchObject({ devModeEnabled: false })
})

test("forcefully enable dev mode", () => {
  const { dispatch, getState } = store

  expect(getState().devMode).toMatchObject({ devModeEnabled: false })
  dispatch.devMode.enable()
  expect(getState().devMode).toMatchObject({ devModeEnabled: true })
})

test("forcefully disable dev mode", () => {
  const { dispatch, getState } = store

  dispatch.devMode.enable()
  expect(getState().devMode).toMatchObject({ devModeEnabled: true })
  dispatch.devMode.disable()
  expect(getState().devMode).toMatchObject({ devModeEnabled: false })
})

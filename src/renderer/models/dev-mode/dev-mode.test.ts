import { init } from "@rematch/core"
import devMode from "Renderer/models/dev-mode/dev-mode"

let store = init({
  models: { devMode },
})

// Cleans store after each test
beforeEach(() => {
  store = init({
    models: { devMode },
  })
})

it("should have default state properly defined", () => {
  const { getState } = store

  expect(getState().devMode).toMatchObject({ enabled: false })
})

it("should properly toggle dev mode state", () => {
  const { dispatch, getState } = store

  expect(getState().devMode).toMatchObject({ enabled: false })
  dispatch.devMode.toggle()
  expect(getState().devMode).toMatchObject({ enabled: true })
  dispatch.devMode.toggle()
  expect(getState().devMode).toMatchObject({ enabled: false })
})

it("should forcefully enable dev mode", () => {
  const { dispatch, getState } = store

  expect(getState().devMode).toMatchObject({ enabled: false })
  dispatch.devMode.enable()
  expect(getState().devMode).toMatchObject({ enabled: true })
})

it("should forcefully disable dev mode", () => {
  const { dispatch, getState } = store

  dispatch.devMode.enable()
  expect(getState().devMode).toMatchObject({ enabled: true })
  dispatch.devMode.disable()
  expect(getState().devMode).toMatchObject({ enabled: false })
})

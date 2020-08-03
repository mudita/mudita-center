import { init } from "@rematch/core"
import phoneUpdate from "Renderer/models/phone-update/phone-update"

let store = init({
  models: { phoneUpdate },
})

beforeEach(() => {
  store = init({
    models: { phoneUpdate },
  })
})

test("initial state should have 3 properties", () => {
  const state = store.getState()
  expect(Object.keys(state.phoneUpdate)).toHaveLength(3)
})

test("reducer should update the state", () => {
  const state = store.getState()
  expect(state.phoneUpdate.pureOsAvailable).toBeFalsy()
  store.dispatch.phoneUpdate.update({ pureOsAvailable: true })
  const updatedState = store.getState()
  expect(updatedState.phoneUpdate.pureOsAvailable).toBeTruthy()
})

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

test("reducer should update the state", () => {
  const state = store.getState()
  expect(state.phoneUpdate.pureOsAvailable).toBeFalsy()
  store.dispatch.phoneUpdate.update({ pureOsAvailable: true })
  const updatedState = store.getState()
  expect(updatedState.phoneUpdate.pureOsAvailable).toBeTruthy()
})

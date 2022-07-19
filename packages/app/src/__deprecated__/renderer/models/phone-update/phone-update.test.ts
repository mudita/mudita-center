/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import phoneUpdate from "App/__deprecated__/renderer/models/phone-update/phone-update"

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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(state.phoneUpdate.pureOsAvailable).toBeFalsy()
  store.dispatch.phoneUpdate.update({ pureOsAvailable: true })
  const updatedState = store.getState()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(updatedState.phoneUpdate.pureOsAvailable).toBeTruthy()
})

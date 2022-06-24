/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { initialState, deviceReducer } from "App/device/reducers"
import { deviceStateSelector } from "App/device/selectors/device-state.selector"

describe("`deviceStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      device: deviceReducer(initialState, {} as any),
    } as ReduxRootState
    expect(deviceStateSelector(state)).toEqual(initialState)
  })
})

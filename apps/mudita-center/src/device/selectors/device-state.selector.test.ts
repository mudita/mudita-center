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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      device: deviceReducer(initialState, {} as any),
    } as ReduxRootState
    expect(deviceStateSelector(state)).toEqual(initialState)
  })
})

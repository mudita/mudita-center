/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MockDate from "mockdate"
import { ReduxRootState } from "Renderer/store"
import { deviceReducer, initialState } from "App/device"
import { getLeftTimeSelector } from "App/device/selectors/get-left-time.selector"

MockDate.set("2000-2-1")

describe("`getLeftTimeSelector` selector", () => {
  test("when initial state is set selector returns undefined", () => {
    const state = {
      device: deviceReducer(initialState, {} as any),
    } as ReduxRootState
    expect(getLeftTimeSelector(state)).toEqual(undefined)
  })

  test("when `phoneLockTime` and `timeLeftToNextAttempt` are undefined set selector returns undefined", () => {
    const state = {
      device: deviceReducer(
        {
          ...initialState,
          data: { phoneLockTime: undefined, timeLeftToNextAttempt: undefined },
        },
        {} as any
      ),
    } as ReduxRootState
    expect(getLeftTimeSelector(state)).toEqual(undefined)
  })

  test("when `timeLeftToNextAttempt` isn't undefined set selector returns value", () => {
    const state = {
      device: deviceReducer(
        {
          ...initialState,
          data: { phoneLockTime: undefined, timeLeftToNextAttempt: 30 },
        },
        {} as any
      ),
    } as ReduxRootState
    expect(getLeftTimeSelector(state)).toEqual(30)
  })
})

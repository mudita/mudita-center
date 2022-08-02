/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MockDate from "mockdate"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { deviceReducer, initialState } from "App/device"
import { getLeftTimeSelector } from "App/device/selectors/get-left-time.selector"

MockDate.set("2000-2-1")

describe("`getLeftTimeSelector` selector", () => {
  test("when initial state is set selector returns undefined", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(getLeftTimeSelector(state)).toEqual(30)
  })
})

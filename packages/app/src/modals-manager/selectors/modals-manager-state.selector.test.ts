/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { modalsManagerReducer, initialState } from "App/modals-manager/reducers"
import { modalsManagerStateSelector } from "App/modals-manager/selectors/modals-manager-state.selector"

describe("`modalsManagerStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      modalsManager: modalsManagerReducer(initialState, {} as any),
    } as ReduxRootState
    expect(modalsManagerStateSelector(state)).toEqual(initialState)
  })
})

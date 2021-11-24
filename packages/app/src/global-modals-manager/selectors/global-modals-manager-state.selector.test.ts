/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { globalModalsManagerReducer, initialState } from "App/global-modals-manager/reducers"
import { globalModalsManagerStateSelector } from "App/global-modals-manager/selectors/global-modals-manager-state.selector"

describe("`globalModalsManagerStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      globalModalsManager: globalModalsManagerReducer(initialState, {} as any),
    } as ReduxRootState
    expect(globalModalsManagerStateSelector(state)).toEqual(initialState)
  })
})

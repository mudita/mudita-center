/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import {
  modalsManagerReducer,
  initialState,
} from "App/modals-manager/reducers"
import { noModalsShowSelector } from "App/modals-manager/selectors/no-modals-show.selector"

describe("`noModalsShowSelector` selector", () => {
  test("when initial state is set selector returns true", () => {
    const state = {
      modalsManager: modalsManagerReducer(initialState, {} as any),
    } as ReduxRootState
    expect(noModalsShowSelector(state)).toBeTruthy()
  })

  test("when `collectingDataModalShow` property is set to true", () => {
    const state = {
      modalsManager: modalsManagerReducer(
        { ...initialState, collectingDataModalShow: true },
        {} as any
      ),
    } as ReduxRootState
    expect(noModalsShowSelector(state)).toBeFalsy()
  })
})

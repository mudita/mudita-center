/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import {
  globalModalsManagerReducer,
  initialState,
} from "App/global-modals-manager/reducers"
import { collectingDataModalShowSelector } from "App/global-modals-manager/selectors/collecting-data-modal-show.selector"

describe("`collectingDataModalShowSelector` selector", () => {
  test("when initial state is set selector returns false", () => {
    const state = {
      globalModalsManager: globalModalsManagerReducer(initialState, {} as any),
    } as ReduxRootState
    expect(collectingDataModalShowSelector(state)).toBeFalsy()
  })

  test("when `collectingDataModalShow` property is set to true", () => {
    const state = {
      globalModalsManager: globalModalsManagerReducer(
        { ...initialState, collectingDataModalShow: true },
        {} as any
      ),
    } as ReduxRootState
    expect(collectingDataModalShowSelector(state)).toBeTruthy()
  })

  test("when `collectingDataModalShow` and `allModalsShowBlocked` property are set to true", () => {
    const state = {
      globalModalsManager: globalModalsManagerReducer(
        {
          ...initialState,
          allModalsShowBlocked: true,
          collectingDataModalShow: true,
        },
        {} as any
      ),
    } as ReduxRootState
    expect(collectingDataModalShowSelector(state)).toBeFalsy()
  })
})

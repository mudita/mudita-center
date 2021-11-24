/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  globalModalsManagerReducer,
  initialState,
} from "App/global-modals-manager/reducers/global-modals-manager.reducer"

test("empty event returns initial state", () => {
  expect(globalModalsManagerReducer(undefined, {} as any)).toEqual(initialState)
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  modalsManagerReducer,
  initialState,
} from "App/modals-manager/reducers/modals-manager.reducer"

test("empty event returns initial state", () => {
  expect(modalsManagerReducer(undefined, {} as any)).toEqual(initialState)
})

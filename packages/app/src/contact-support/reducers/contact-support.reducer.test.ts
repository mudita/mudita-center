/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  contactSupportReducer,
  initialState,
} from "App/contact-support/reducers/contact-support.reducer"

test("empty event returns initial state", () => {
  expect(contactSupportReducer(undefined, {} as any)).toEqual(initialState)
})

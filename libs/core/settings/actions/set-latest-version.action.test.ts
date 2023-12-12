/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setLatestVersion } from "./set-latest-version.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `setLatestVersion` with provided value", () => {
  mockStore.dispatch(setLatestVersion("1.0.0") as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([setLatestVersion("1.0.0")])
})

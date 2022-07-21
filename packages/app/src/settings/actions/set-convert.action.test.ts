/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setConvert } from "./set-convert.action"
import { Convert } from "App/settings/constants"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
  mockStore.clearActions()
})

test.each([Convert.AlwaysAsk, Convert.ConvertAutomatically])(
  "calls `setConvert` with payload: %s, and `updateSettings` request with value: %s",
  async (key) => {
    expect(updateSettings).not.toHaveBeenCalled()

    const {
      meta: { requestId },
    } = await mockStore.dispatch(setConvert(key) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      setConvert.pending(requestId, key),
      setConvert.fulfilled(key, requestId, key),
    ])
    expect(updateSettings).toHaveBeenCalledWith({ key: "convert", value: key })
  }
)

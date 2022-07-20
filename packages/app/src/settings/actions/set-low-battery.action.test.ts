/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setLowBattery } from "./set-low-battery.action"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `setLowBattery` and `updateSettings` request with boolean", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
  } = await mockStore.dispatch(setLowBattery(true) as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    setLowBattery.pending(requestId, true),
    setLowBattery.fulfilled(true, requestId, true),
  ])
  expect(updateSettings).toHaveBeenCalledWith({
    key: "lowBattery",
    value: true,
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { toggleTethering } from "./toggle-tethering.action"
import { updateSettings } from "Core/settings/requests"

jest.mock("Core/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `toggleTethering` and `updateSettings` request with boolean", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(toggleTethering(true) as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    toggleTethering.pending(requestId, true),
    toggleTethering.fulfilled(true, requestId, true),
  ])
  expect(updateSettings).toHaveBeenCalledWith({ key: "tethering", value: true })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setOsUpdates } from "./set-os-updates.action"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `setOsUpdates` and `updateSettings` request with Boolean", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(setOsUpdates(true) as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    setOsUpdates.pending(requestId, true),
    setOsUpdates.fulfilled(true, requestId, true),
  ])
  expect(updateSettings).toHaveBeenCalledWith({ key: "osUpdates", value: true })
})

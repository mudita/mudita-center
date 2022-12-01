/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setIncomingMessages } from "./set-incoming-messages.action"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `setIncomingMessages` and `updateSettings` request with boolean", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    setIncomingMessages(true) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    setIncomingMessages.pending(requestId, true),
    setIncomingMessages.fulfilled(true, requestId, true),
  ])
  expect(updateSettings).toHaveBeenCalledWith({
    key: "incomingMessages",
    value: true,
  })
})

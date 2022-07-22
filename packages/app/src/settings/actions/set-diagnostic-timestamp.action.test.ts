/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setDiagnosticTimestamp } from "./set-diagnostic-timestamp.action"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const dateMock = new Date("2021-08-05T11:50:35.157Z").getDate()

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `setDiagnosticTimestamp` and `updateSettings` request with timestamp", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
  } = await mockStore.dispatch(
    setDiagnosticTimestamp(dateMock) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    setDiagnosticTimestamp.pending(requestId, dateMock),
    setDiagnosticTimestamp.fulfilled(dateMock, requestId, dateMock),
  ])
  expect(updateSettings).toHaveBeenCalledWith({
    key: "diagnosticSentTimestamp",
    value: dateMock,
  })
})

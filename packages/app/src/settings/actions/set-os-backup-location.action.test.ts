/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setOsBackupLocation } from "./set-os-backup-location.action"
import { updateSettings } from "App/settings/requests"

jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `setOsBackupLocation` and `updateSettings` request with path", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    setOsBackupLocation("/test/path") as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    setOsBackupLocation.pending(requestId, "/test/path"),
    setOsBackupLocation.fulfilled("/test/path", requestId, "/test/path"),
  ])
  expect(updateSettings).toHaveBeenCalledWith({
    key: "osBackupLocation",
    value: "/test/path",
  })
})

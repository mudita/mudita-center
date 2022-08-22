/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { toggleUpdateAvailable } from "./toggle-update-available.action"

jest.mock("App/modals-manager/actions", () => ({
  checkAppUpdateFlowToShow: () => jest.fn(),
}))

const mockStore = createMockStore([thunk])()

afterEach(() => {
  jest.clearAllMocks()
})

test("calls `toggleUpdateAvailable` action dispatch SettingsEvent.ToggleUpdateAvailable", async () => {
  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    toggleUpdateAvailable(true) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    toggleUpdateAvailable.pending(requestId, true),
    toggleUpdateAvailable.fulfilled(true, requestId, true),
  ])
})

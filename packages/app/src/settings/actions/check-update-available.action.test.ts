/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { checkUpdateAvailable } from "./check-update-available.action"
import checkAppUpdateRequest from "App/__deprecated__/renderer/requests/check-app-update.request"

jest.mock("App/__deprecated__/renderer/requests/check-app-update.request")

const mockStore = createMockStore([thunk])()

test("`checkUpdateAvailable` action dispatch SettingsEvent.CheckUpdateAvailable event and calls checkAppUpdateRequest", async () => {
  expect(checkAppUpdateRequest).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(checkUpdateAvailable() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    checkUpdateAvailable.pending(requestId),
    checkUpdateAvailable.fulfilled(undefined, requestId, undefined),
  ])
  expect(checkAppUpdateRequest).toHaveBeenCalled()
})

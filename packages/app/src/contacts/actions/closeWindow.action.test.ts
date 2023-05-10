/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState } from "App/contacts/reducers"
import { closeWindow } from "App/contacts/actions/closeWindow.action"
import { Provider } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"

jest.mock("App/__deprecated__/renderer/store/external-providers")

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `closeWindow` ", () => {
  describe("when `closeWindow` request is called", () => {
    test("fire async `closeWindow` no returns any value", async () => {
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        closeWindow(Provider.Google) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        closeWindow.pending(requestId, Provider.Google),
        closeWindow.fulfilled(undefined, requestId, Provider.Google),
      ])
    })
  })
})

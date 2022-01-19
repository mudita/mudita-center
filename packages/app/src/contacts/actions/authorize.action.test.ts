/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState } from "App/contacts/reducers"
import { authorize } from "App/contacts/actions/authorize.action"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

jest.mock("Renderer/store/external-providers")

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `authorize` ", () => {
  describe("when `authorize` request is called", () => {
    test("fire async `authorize` no returns any value", async () => {
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        authorize(Provider.Google) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        authorize.pending(requestId, Provider.Google),
        authorize.fulfilled(undefined, requestId, Provider.Google),
      ])
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState } from "Core/contacts/reducers"
import { authorize } from "Core/contacts/actions/authorize.action"
import { Provider } from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"

jest.mock("Core/__deprecated__/renderer/store/external-providers")

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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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

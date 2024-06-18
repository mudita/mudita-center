/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState } from "Core/contacts/reducers"
import { authorize } from "Core/contacts/actions/authorize.action"
import { Provider } from "generic-view/store"
import { fulfilledAction } from "Core/__deprecated__/renderer/store"

jest.mock("generic-view/store", () => {
  const actualModule = jest.requireActual("generic-view/store")
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...actualModule,
    googleAuthorize: () =>
      ({
        type: fulfilledAction("generic-imports/google-authorization-process"),
      } as unknown as jest.Mock),
  }
})

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
        {
          type: fulfilledAction("generic-imports/google-authorization-process"),
        },
        authorize.fulfilled(
          {
            type: fulfilledAction(
              "generic-imports/google-authorization-process"
            ),
          },
          requestId,
          Provider.Google
        ),
      ])
    })
  })
})

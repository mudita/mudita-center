/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { AnyAction } from "@reduxjs/toolkit"
import { changeLocation } from "App/core/actions/change-location.action"
import { CoreEvent } from "App/core/constants"

afterEach(() => {
  jest.resetAllMocks()
})

test("call `changeLocation` dispatching `CoreEvent.ChangeLocation` event", async () => {
  const mockStore = createMockStore([thunk])()

  mockStore.dispatch(changeLocation() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    {
      type: CoreEvent.ChangeLocation,
      payload: undefined,
    },
  ])
})

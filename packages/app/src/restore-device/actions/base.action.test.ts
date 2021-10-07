/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { readRestoreDeviceDataState } from "App/restore-device/actions/base.action"
import { RestoreDeviceEvent } from "App/restore-device/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: readRestoreDeviceDataState", () => {
  test("fire action with `ReadRestoreDeviceDataState` type", () => {
    mockStore.dispatch(readRestoreDeviceDataState())
    expect(mockStore.getActions()).toEqual([
      {
        type: RestoreDeviceEvent.ReadRestoreDeviceDataState,
        payload: undefined,
      },
    ])
  })
})

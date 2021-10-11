/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { readBackupDeviceDataState } from "App/backup-device/actions/base.action"
import { BackupDeviceEvent } from "App/backup-device/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: readBackupDeviceDataState", () => {
  test("fire action with `ReadBackupDeviceDataState` type", () => {
    mockStore.dispatch(readBackupDeviceDataState())
    expect(mockStore.getActions()).toEqual([
      {
        type: BackupDeviceEvent.ReadBackupDeviceDataState,
        payload: undefined,
      },
    ])
  })
})

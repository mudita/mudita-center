/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { BackupEvent } from "App/backup/constants"
import {
  setBackupData,
  readBackupDeviceDataState,
  readRestoreDeviceDataState,
} from "App/backup/actions/base.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setBackupData", () => {
  test("fire action with empty array and `SetBackupData` type", () => {
    mockStore.dispatch(setBackupData([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: BackupEvent.SetBackupData,
        payload: [],
      },
    ])
  })
})

describe("Action: readBackupDeviceDataState", () => {
  test("fire action with `ReadBackupDeviceDataState` type", () => {
    mockStore.dispatch(readBackupDeviceDataState())
    expect(mockStore.getActions()).toEqual([
      {
        type: BackupEvent.ReadBackupDeviceDataState,
        payload: undefined,
      },
    ])
  })
})

describe("Action: readRestoreDeviceDataState", () => {
  test("fire action with `ReadRestoreDeviceDataState` type", () => {
    mockStore.dispatch(readRestoreDeviceDataState())
    expect(mockStore.getActions()).toEqual([
      {
        type: BackupEvent.ReadRestoreDeviceDataState,
        payload: undefined,
      },
    ])
  })
})

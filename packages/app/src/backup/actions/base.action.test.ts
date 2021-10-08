/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { BackupEvent } from "App/backup/constants"
import { setBackupData } from "App/backup/actions/base.action"

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

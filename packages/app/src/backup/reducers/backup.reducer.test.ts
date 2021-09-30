/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { backupReducer, initialState } from "App/backup/reducers/backup.reducer"
import { BackupEvent } from "App/backup/constants"
import { BackupDataState } from "App/backup/reducers/backup.interface"
import { LoadBackupDataError } from "App/backup/errors"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store/helpers"

test("empty event returns initial state", () => {
  expect(backupReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Load Backup data functionality", () => {
  test("Event: Load/pending change `state` to Loading", () => {
    expect(
      backupReducer(undefined, {
        type: pendingAction(BackupEvent.Load),
      })
    ).toEqual({
      ...initialState,
      state: BackupDataState.Loading
    })
  })

  test("Event: Load/fulfilled change `state` to Loaded", () => {
    expect(
      backupReducer(undefined, {
        type: fulfilledAction(BackupEvent.Load),
      })
    ).toEqual({
      ...initialState,
      state: BackupDataState.Loaded
    })
  })

  test("Event: Load/rejected change `state` to Loaded", () => {
    const errorMock = new LoadBackupDataError("I'm error")

    expect(
      backupReducer(undefined, {
        type: rejectedAction(BackupEvent.Load),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: BackupDataState.Loaded,
      error: errorMock,
    })
  })
})

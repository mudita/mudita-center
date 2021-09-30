/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  BackupEvent,
  backupReducer,
  initialState,
  LoadBackupDataError,
} from "App/backup"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"

test("empty event returns initial state", () => {
  expect(backupReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Load Backup data functionality", () => {
  console.log("BackupEvent: ", BackupEvent)
  test("Event: Load/pending change `state` to Loading", () => {
    expect(
      backupReducer(undefined, {
        type: pendingAction(BackupEvent.Load),
      })
    ).toEqual({
      ...initialState,
    })
  })

  test("Event: Load/fulfilled change `state` to Loaded", () => {
    expect(
      backupReducer(undefined, {
        type: fulfilledAction(BackupEvent.Load),
      })
    ).toEqual({
      ...initialState,
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
    })
  })
})

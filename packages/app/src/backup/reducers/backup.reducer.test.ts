/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { backupReducer, initialState } from "App/backup/reducers/backup.reducer"
import { BackupEvent } from "App/backup/constants"
import { Backup, BackupDataState } from "App/backup/reducers/backup.interface"
import { LoadBackupDataError } from "App/backup/errors"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"

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
      state: BackupDataState.Loading,
    })
  })

  test("Event: Load/fulfilled change `state` to Loaded", () => {
    expect(
      backupReducer(undefined, {
        type: fulfilledAction(BackupEvent.Load),
      })
    ).toEqual({
      ...initialState,
      state: BackupDataState.Loaded,
    })
  })

  test("Event: Load/rejected change `state` to Error", () => {
    const errorMock = new LoadBackupDataError("I'm error")

    expect(
      backupReducer(undefined, {
        type: rejectedAction(BackupEvent.Load),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: BackupDataState.Error,
      error: errorMock,
    })
  })
})

describe("Set Backup data functionality", () => {
  const setBackupDataAction: PayloadAction<Backup[]> = {
    type: BackupEvent.SetBackupData,
    payload: [
      {
        filePath: "C:\\backups\\backup-0.text",
        date: new Date(),
      },
    ],
  }

  test("Event: SetBackupData set backups field", () => {
    expect(backupReducer(undefined, setBackupDataAction)).toEqual({
      ...initialState,
      backups: setBackupDataAction.payload,
    })
  })

  test("Event: SetBackupData replace existing backups field with data received from `payload`", () => {
    expect(
      backupReducer(
        {
          ...initialState,
          backups: [
            {
              filePath: "C:\\backups\\backup-1.text",
              date: new Date(),
            },
          ],
        },
        setBackupDataAction
      )
    ).toEqual({
      ...initialState,
      backups: setBackupDataAction.payload,
    })
  })
})

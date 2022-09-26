/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { BackupError, BackupEvent } from "App/backup/constants"
import { Backup } from "App/backup/dto"
import { backupReducer, initialState } from "App/backup/reducers/backup.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      loadingState: State.Loading,
    })
  })

  test("Event: Load/fulfilled change `state` to Loaded", () => {
    expect(
      backupReducer(undefined, {
        type: fulfilledAction(BackupEvent.Load),
      })
    ).toEqual({
      ...initialState,
      loadingState: State.Loaded,
    })
  })

  test("Event: Load/rejected change `state` to Error", () => {
    const errorMock = new AppError(BackupError.Load, "I'm error")

    expect(
      backupReducer(undefined, {
        type: rejectedAction(BackupEvent.Load),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      loadingState: State.Failed,
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
      data: {
        backups: setBackupDataAction.payload,
      },
    })
  })

  test("Event: SetBackupData replace existing backups field with data received from `payload`", () => {
    expect(
      backupReducer(
        {
          ...initialState,
          data: {
            backups: [
              {
                filePath: "C:\\backups\\backup-1.text",
                date: new Date(),
              },
            ],
          },
        },
        setBackupDataAction
      )
    ).toEqual({
      ...initialState,
      data: {
        backups: setBackupDataAction.payload,
      },
    })
  })
})

describe("Start backup functionality", () => {
  test("Event: CreateBackup/pending set `backingUpState` to loading", () => {
    expect(
      backupReducer(undefined, {
        type: pendingAction(BackupEvent.CreateBackup),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      backingUpState: State.Loading,
    })
  })

  test("Event: CreateBackup/fulfilled set `backingUpState` to loaded", () => {
    expect(
      backupReducer(undefined, {
        type: fulfilledAction(BackupEvent.CreateBackup),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      backingUpState: State.Loaded,
    })
  })

  test("Event: CreateBackup/rejected set `backingUpState` to failed", () => {
    const errorMock = new AppError(
      BackupError.BackupLocationIsUndefined,
      "Pure OS Backup Desktop Location is undefined"
    )

    expect(
      backupReducer(undefined, {
        type: rejectedAction(BackupEvent.CreateBackup),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      backingUpState: State.Failed,
      error: errorMock,
    })
  })

  test("Event: ReadBackupDeviceDataState reset `backingUpState` to initial value", () => {
    const errorMock = new AppError(
      BackupError.BackupLocationIsUndefined,
      "Pure OS Backup Desktop Location is undefined"
    )

    expect(
      backupReducer(
        {
          ...initialState,
          backingUpState: State.Failed,
          error: errorMock,
        },
        {
          type: BackupEvent.ReadBackupDeviceDataState,
          payload: errorMock,
        }
      )
    ).toEqual({
      ...initialState,
      backingUpState: State.Initial,
      error: null,
    })
  })
})

describe("Restore backup functionality", () => {
  test("Event: RestoreBackup/pending set `restoringState` to loading", () => {
    expect(
      backupReducer(undefined, {
        type: pendingAction(BackupEvent.RestoreBackup),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      restoringState: State.Loading,
    })
  })

  test("Event: RestoreBackup/fulfilled set `restoringState` to loaded", () => {
    expect(
      backupReducer(undefined, {
        type: fulfilledAction(BackupEvent.RestoreBackup),
        payload: undefined,
      })
    ).toEqual({
      ...initialState,
      restoringState: State.Loaded,
    })
  })

  test("Event: RestoreBackup/rejected set `restoringState` to failed", () => {
    const errorMock = new AppError(
      BackupError.BackupLocationIsUndefined,
      "Pure OS Backup Desktop Location is undefined"
    )

    expect(
      backupReducer(undefined, {
        type: rejectedAction(BackupEvent.RestoreBackup),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      restoringState: State.Failed,
      error: errorMock,
    })
  })

  test("Event: ReadRestoreDeviceDataState reset `restoringState` to initial value", () => {
    const errorMock = new AppError(
      BackupError.BackupLocationIsUndefined,
      "Pure OS Backup Desktop Location is undefined"
    )

    expect(
      backupReducer(
        {
          ...initialState,
          restoringState: State.Failed,
          error: errorMock,
        },
        {
          type: BackupEvent.ReadRestoreDeviceDataState,
          payload: errorMock,
        }
      )
    ).toEqual({
      ...initialState,
      restoringState: State.Initial,
      error: null,
    })
  })
})

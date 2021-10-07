/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backupDeviceReducer,
  initialState,
} from "App/backup-device/reducers/backup-device.reducer"
import { BackupDeviceEvent } from "App/backup-device/constants"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { BackupDeviceDataState } from "App/backup-device/reducers/backup-device.interface"
import { readBackupDeviceDataState } from "App/backup-device/actions/base.action"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers/action.helper"

test("empty event returns initial state", () => {
  expect(backupDeviceReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Start Backup Device functionality", () => {
  test("Event: StartBackupDevice/pending change `state` to Running", () => {
    expect(
      backupDeviceReducer(undefined, {
        type: pendingAction(BackupDeviceEvent.StartBackupDevice),
      })
    ).toEqual({
      ...initialState,
      state: BackupDeviceDataState.Running,
    })
  })

  test("Event: StartBackupDevice/fulfilled change `state` to Finished", () => {
    expect(
      backupDeviceReducer(undefined, {
        type: fulfilledAction(BackupDeviceEvent.StartBackupDevice),
      })
    ).toEqual({
      ...initialState,
      state: BackupDeviceDataState.Finished,
    })
  })

  test("Event: StartBackupDevice/rejected change `state` to Error", () => {
    const errorMock = new StartBackupDeviceError("I'm error")

    expect(
      backupDeviceReducer(undefined, {
        type: rejectedAction(BackupDeviceEvent.StartBackupDevice),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: BackupDeviceDataState.Error,
      error: errorMock,
    })
  })
})

describe("`ReadBackupDeviceDataState` data functionality", () => {
  const errorMock = new StartBackupDeviceError("I'm error")

  test("Event: `ReadBackupDeviceDataState` set error property to null", () => {
    expect(
      backupDeviceReducer(
        {
          ...initialState,
          error: errorMock,
        },
        readBackupDeviceDataState
      )
    ).toEqual({
      ...initialState,
      state: BackupDeviceDataState.Empty,
      error: null,
    })
  })
})

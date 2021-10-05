/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */


import { backupDeviceReducer, initialState } from "App/backup-device/reducers/backup-device.reducer"
import { BackupDeviceEvent } from "App/backup-device/constants"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"

test("empty event returns initial state", () => {
  expect(backupDeviceReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Start Backup Device functionality", () => {
  test("Event: StartBackupDevice/pending change `state` to Loading", () => {
    expect(
      backupDeviceReducer(undefined, {
        type: pendingAction(BackupDeviceEvent.StartBackupDevice),
      })
    ).toEqual({
      ...initialState,
    })
  })

  test("Event: StartBackupDevice/fulfilled change `state` to Loaded", () => {
    expect(
      backupDeviceReducer(undefined, {
        type: fulfilledAction(BackupDeviceEvent.StartBackupDevice),
      })
    ).toEqual({
      ...initialState,
    })
  })

  test("Event: StartBackupDevice/rejected change `state` to Loaded", () => {
    const errorMock = new StartBackupDeviceError("I'm error")

    expect(
      backupDeviceReducer(undefined, {
        type: rejectedAction(BackupDeviceEvent.StartBackupDevice),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
    })
  })
})

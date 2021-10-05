/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  BackupDeviceDataState,
  BackupDeviceState,
  StartBackupDeviceErrorRejectAction,
} from "App/backup-device/reducers/backup-device.interface"
import { BackupDeviceEvent } from "App/backup-device/constants"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"

export const initialState: BackupDeviceState = {
  state: BackupDeviceDataState.Empty,
  error: null,
}

export const backupDeviceReducer = createReducer<BackupDeviceState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(BackupDeviceEvent.StartBackupDevice), (state) => {
        return {
          ...state,
          state: BackupDeviceDataState.Running,
        }
      })
      .addCase(
        fulfilledAction(BackupDeviceEvent.StartBackupDevice),
        (state) => {
          return {
            ...state,
            state: BackupDeviceDataState.Finished,
            error: null,
          }
        }
      )
      .addCase(
        rejectedAction(BackupDeviceEvent.StartBackupDevice),
        (state, action: StartBackupDeviceErrorRejectAction) => {
          return {
            ...state,
            state: BackupDeviceDataState.Error,
            error: action.payload,
          }
        }
      )
  }
)

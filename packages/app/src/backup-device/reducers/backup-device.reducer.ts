/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { BackupDeviceState } from "App/backup-device/reducers/backup-device.interface"
import { BackupDeviceEvent } from "App/backup-device/constants"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"

export const initialState: BackupDeviceState = {}

export const backupDeviceReducer = createReducer<BackupDeviceState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(BackupDeviceEvent.StartBackupDevice), (state) => {
        return {
          ...state,
        }
      })
      .addCase(fulfilledAction(BackupDeviceEvent.StartBackupDevice), (state) => {
        return {
          ...state,
        }
      })
      .addCase(rejectedAction(BackupDeviceEvent.StartBackupDevice), (state) => {
        return {
          ...state,
        }
      })
  }
)

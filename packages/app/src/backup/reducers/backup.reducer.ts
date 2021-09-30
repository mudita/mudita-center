/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { BackupEvent, BackupState } from "App/backup"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"

export const initialState: BackupState = {}

export const backupReducer = createReducer<BackupState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(BackupEvent.Load), (state) => {
        return {
          ...state,
        }
      })
      .addCase(fulfilledAction(BackupEvent.Load), (state) => {
        return {
          ...state,
        }
      })
      .addCase(rejectedAction(BackupEvent.Load), (state) => {
        return {
          ...state,
        }
      })
  }
)

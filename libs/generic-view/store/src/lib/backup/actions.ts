/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { BackupProcess } from "./reducer"
import { ActionName } from "../action-names"
import {
  BackupProcessFileStatus,
  BackupProcessStatus,
  RestoreProcessStatus,
} from "./backup.types"

export const setBackupProcess = createAction<BackupProcess>(
  ActionName.SetBackupProcess
)

export const cleanBackupProcess = createAction(ActionName.CleanBackupProcess)

export const setBackupProcessFileStatus = createAction<{
  feature: string
  status: BackupProcessFileStatus
}>(ActionName.SetBackupProcessFileStatus)

export const setBackupProcessStatus = createAction<{
  status: BackupProcessStatus
  progress: number
}>(ActionName.BackupProcessStatus)

export const cleanRestoreProcess = createAction(ActionName.CleanRestoreProcess)

export const setRestoreProcessStatus = createAction<{
  status: RestoreProcessStatus
  progress: number
}>(ActionName.SetRestoreProcessStatus)

export const setRestoreProcessFileStatus = createAction<{
  feature: string
  status: BackupProcessFileStatus
}>(ActionName.SetRestoreProcessFileStatus)

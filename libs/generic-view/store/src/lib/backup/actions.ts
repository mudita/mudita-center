/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import {
  BackupProcess,
  BackupProcessFileStatus,
  BackupProcessStatus,
} from "./reducer"
import { ActionName } from "../action-names"

export const setBackupProcess = createAction<BackupProcess>(
  ActionName.SetBackupProcess
)

export const cleanBackupProcess = createAction(ActionName.CleanBackupProcess)

export const setBackupProcessFileStatus = createAction<{
  feature: string
  status: BackupProcessFileStatus
}>(ActionName.SetBackupProcessFileStatus)

export const setBackupProcessStatus = createAction<BackupProcessStatus>(
  ActionName.BackupProcessStatus
)

export const cleanRestoreProcess = createAction(ActionName.CleanRestoreProcess)

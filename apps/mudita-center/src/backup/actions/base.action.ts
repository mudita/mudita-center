/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"
import { Backup } from "App/backup/dto"

export const setBackupData = createAction<Backup[]>(BackupEvent.SetBackupData)

export const readBackupDeviceDataState = createAction(
  BackupEvent.ReadBackupDeviceDataState
)

export const readRestoreDeviceDataState = createAction(
  BackupEvent.ReadRestoreDeviceDataState
)

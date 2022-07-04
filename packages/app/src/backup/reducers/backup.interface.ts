/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { BackupError, BackupEvent } from "App/backup/constants"
import { AppError } from "App/core/errors"
import { FileData } from "App/__deprecated__/main/functions/register-get-file-data-listener"

export interface Backup extends FileData {
  filePath: string
  date: Date
}

export enum BackupDataState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface BackupState {
  backups: Backup[]
  state: BackupDataState
  error: Error | string | null
}

export type LoadBackupDataRejectAction = PayloadAction<
  AppError<BackupError.Load>,
  BackupEvent.Load
>

export type SetBackupDataAction = PayloadAction<
  Backup[],
  BackupEvent.SetBackupData
>

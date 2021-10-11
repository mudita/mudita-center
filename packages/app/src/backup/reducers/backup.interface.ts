/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { LoadBackupDataError } from "App/backup/errors"
import { BackupEvent } from "App/backup/constants"
import { FileData } from "App/main/functions/register-get-file-data-listener"

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
  LoadBackupDataError,
  BackupEvent.Load
>

export type SetBackupDataAction = PayloadAction<
  Backup[],
  BackupEvent.SetBackupData
>

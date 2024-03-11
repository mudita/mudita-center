/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  cleanBackupProcess,
  cleanRestoreProcess,
  setBackupProcess,
  setBackupProcessFileStatus,
  setBackupProcessStatus,
} from "./actions"
import { createBackup } from "./create-backup.action"
import { refreshBackupList } from "./refresh-backup-list.action"
import { RestoreMetadata } from "device/models"
import { loadBackupMetadata } from "./load-backup.metadata"

export interface Backup {
  fileName: string
  date: Date
  serialNumber: string
}

export type BackupProcessStatus =
  | "PRE_BACKUP"
  | "FILES_TRANSFER"
  | "SAVE_FILE"
  | "DONE"
  | "FAILED"

export type BackupProcessFileStatus = "PENDING" | "IN_PROGRESS" | "DONE"

export interface BackupProcess {
  status: BackupProcessStatus
  featureFilesTransfer: Record<
    string,
    { transferId?: number; status: BackupProcessFileStatus }
  >
}

export type RestoreProcessStatus =
  | "PASSWORD_NOT_REQUIRED"
  | "PASSWORD_REQUIRED"
  | "PRE_RESTORE"
  | "FILES_TRANSFER"
  | "DONE"
  | "FAILED"

export interface RestoreProcess {
  status: RestoreProcessStatus
  metadata?: RestoreMetadata
}

interface BackupState {
  lastBackupRefresh: number
  backups: Backup[]
  backupProcess?: BackupProcess
  restoreProcess?: RestoreProcess
}

const initialState: BackupState = {
  lastBackupRefresh: 0,
  backups: [],
}

export const genericBackupsReducer = createReducer(initialState, (builder) => {
  builder.addCase(cleanBackupProcess, (state, action) => {
    delete state.backupProcess
  })
  builder.addCase(setBackupProcess, (state, action) => {
    state.backupProcess = action.payload
  })
  builder.addCase(setBackupProcessFileStatus, (state, action) => {
    if (state.backupProcess) {
      state.backupProcess.featureFilesTransfer[action.payload.feature].status =
        action.payload.status
    }
  })
  builder.addCase(setBackupProcessStatus, (state, action) => {
    if (state.backupProcess) {
      state.backupProcess.status = action.payload
    }
  })
  builder.addCase(createBackup.rejected, (state, action) => {
    if (state.backupProcess) {
      state.backupProcess.status = "FAILED"
    } else {
      state.backupProcess = {
        status: "FAILED",
        featureFilesTransfer: {},
      }
    }
  })
  builder.addCase(createBackup.fulfilled, (state, action) => {
    if (state.backupProcess) {
      state.backupProcess.status = "DONE"
    } else {
      state.backupProcess = {
        status: "DONE",
        featureFilesTransfer: {},
      }
    }
  })
  builder.addCase(refreshBackupList.fulfilled, (state, action) => {
    if (state.lastBackupRefresh < action.payload.refreshTimestamp) {
      state.lastBackupRefresh = action.payload.refreshTimestamp
      state.backups = action.payload.backups
    }
  })
  builder.addCase(loadBackupMetadata.fulfilled, (state, action) => {
    state.restoreProcess = {
      status: action.payload.header.password
        ? "PASSWORD_REQUIRED"
        : "PASSWORD_NOT_REQUIRED",
      metadata: action.payload,
    }
  })
  builder.addCase(loadBackupMetadata.rejected, (state, action) => {
    console.log(action)
    if ("status" in state.restoreProcess!) {
      state.restoreProcess.status = "FAILED"
    } else {
      state.restoreProcess = {
        status: "FAILED",
      }
    }
  })
  builder.addCase(cleanRestoreProcess, (state, action) => {
    delete state.restoreProcess
  })
})

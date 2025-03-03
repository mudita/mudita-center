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
  setRestoreProcessFileStatus,
  setRestoreProcessStatus,
} from "./actions"
import { createBackup } from "./create-backup.action"
import { refreshBackupList } from "./refresh-backup-list.action"
import { RestoreMetadata } from "device/models"
import { loadBackupMetadata } from "./load-backup-metadata.action"
import { restoreBackup } from "./restore-backup.action"
import {
  BackupProcessFileStatus,
  BackupProcessStatus,
  RestoreProcessStatus,
} from "./backup.types"

export interface Backup {
  fileName: string
  date: Date
  serialNumber: string
}

export interface BackupProcess {
  status: BackupProcessStatus
  progress: number
  featureFilesTransfer: Record<
    string,
    { transferId?: number; status: BackupProcessFileStatus }
  >
}

export interface RestoreProcess {
  status: RestoreProcessStatus
  progress: number
  metadata?: RestoreMetadata
  restoreFileId?: string
  featureFilesTransfer?: Record<
    string,
    { transferId?: number; status: BackupProcessFileStatus }
  >
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
      state.backupProcess.status = action.payload.status
      state.backupProcess.progress = action.payload.progress
    }
  })
  builder.addCase(createBackup.rejected, (state, action) => {
    if (state.backupProcess) {
      state.backupProcess.status = BackupProcessStatus.Failed
    } else {
      state.backupProcess = {
        status: BackupProcessStatus.Failed,
        featureFilesTransfer: {},
        progress: 0,
      }
    }
  })
  builder.addCase(createBackup.fulfilled, (state, action) => {
    if (state.backupProcess) {
      state.backupProcess.status = BackupProcessStatus.Done
    } else {
      state.backupProcess = {
        status: BackupProcessStatus.Done,
        featureFilesTransfer: {},
        progress: 100,
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
      status: action.payload.restoreMetadata.header.password
        ? RestoreProcessStatus.PasswordRequired
        : RestoreProcessStatus.PasswordNotRequired,
      metadata: action.payload.restoreMetadata,
      restoreFileId: action.payload.restoreFileId,
      progress: 0,
    }
  })
  builder.addCase(cleanRestoreProcess, (state, action) => {
    delete state.restoreProcess
  })
  builder.addCase(loadBackupMetadata.rejected, (state, action) => {
    state.restoreProcess = {
      status: RestoreProcessStatus.Failed,
      progress: 0,
    }
  })
  builder.addCase(restoreBackup.pending, (state, action) => {
    state.restoreProcess = {
      ...state.restoreProcess,
      status: RestoreProcessStatus.PreRestore,
      progress: 0,
    }
  })
  builder.addCase(restoreBackup.rejected, (state, action) => {
    state.restoreProcess = {
      status: RestoreProcessStatus.Failed,
      progress: 0,
    }
  })
  builder.addCase(setRestoreProcessStatus, (state, action) => {
    state.restoreProcess = {
      ...state.restoreProcess,
      status: action.payload.status,
      progress: action.payload.progress,
    }
  })
  builder.addCase(setRestoreProcessFileStatus, (state, action) => {
    if (state.restoreProcess) {
      state.restoreProcess.featureFilesTransfer = {
        ...state.restoreProcess.featureFilesTransfer,
        [action.payload.feature]: { status: action.payload.status },
      }
    }
  })
})

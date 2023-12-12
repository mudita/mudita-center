/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { Backup } from "Core/backup/dto"
import { BackupError, IpcBackupEvent } from "Core/backup/constants"
import {
  BackupCreateService,
  BackupRestoreService,
  LoadBackupService,
} from "Core/backup/services"
import { CreateDeviceBackup, RestoreDeviceBackup } from "Core/backup/types"

export class BackupController {
  constructor(
    private backupCreateService: BackupCreateService,
    private backupRestoreService: BackupRestoreService,
    private loadBackupService: LoadBackupService
  ) {}

  @IpcEvent(IpcBackupEvent.LoadBackups)
  public loadBackups(data: string): ResultObject<Backup[] | undefined> {
    return this.loadBackupService.loadBackups(data)
  }

  @IpcEvent(IpcBackupEvent.CreateBackup)
  public async createBackup(
    data: CreateDeviceBackup
  ): Promise<ResultObject<string[] | undefined>> {
    return this.backupCreateService.createBackup(data)
  }

  @IpcEvent(IpcBackupEvent.RestoreBackup)
  public async restoreBackup(
    data: RestoreDeviceBackup
  ): Promise<ResultObject<boolean, BackupError>> {
    return this.backupRestoreService.restoreBackup(data)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import { Backup } from "App/backup/dto"
import { ControllerPrefix, IpcBackupEvent } from "App/backup/constants"
import {
  BackupCreateService,
  BackupRestoreService,
  LoadBackupService,
} from "App/backup/services"
import { CreateDeviceBackup, RestoreDeviceBackup } from "App/backup/types"

@Controller(ControllerPrefix)
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
  ): Promise<ResultObject<boolean | undefined>> {
    return this.backupRestoreService.restoreBackup(data)
  }
}

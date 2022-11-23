/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { BackupCategory } from "App/device/constants"
import { DeviceFileSystemService } from "App/device-file-system/services"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import { IndexStorage } from "App/index-storage/types"
import { DataIndex } from "App/index-storage/constants"
import { DeviceManager } from "App/device-manager/services"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import {
  ContactIndexer,
  MessageIndexer,
  ThreadIndexer,
  TemplateIndexer,
} from "App/data-sync/indexes"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import {
  ContactPresenter,
  MessagePresenter,
  TemplatePresenter,
  ThreadPresenter,
} from "App/data-sync/presenters"
import { BackupCreateService } from "App/backup/services/backup-create.service"

export class DataSyncService {
  private contactIndexer: ContactIndexer | null = null
  private messageIndexer: MessageIndexer | null = null
  private threadIndexer: ThreadIndexer | null = null
  private templateIndexer: TemplateIndexer | null = null
  private deviceBackupService: BackupCreateService

  constructor(
    private index: IndexStorage,
    private deviceManager: DeviceManager,
    private keyStorage: MetadataStore,
    private fileSystemStorage: FileSystemService
  ) {
    this.deviceBackupService = new BackupCreateService(
      this.deviceManager,
      new DeviceFileSystemService(this.deviceManager),
      this.keyStorage
    )

    this.contactIndexer = new ContactIndexer(
      this.fileSystemStorage,
      new ContactPresenter()
    )
    this.messageIndexer = new MessageIndexer(
      this.fileSystemStorage,
      new MessagePresenter()
    )
    this.threadIndexer = new ThreadIndexer(
      this.fileSystemStorage,
      new ThreadPresenter()
    )
    this.templateIndexer = new TemplateIndexer(
      this.fileSystemStorage,
      new TemplatePresenter()
    )
  }

  public async indexAll(): Promise<boolean> {
    const serialNumber = String(
      this.keyStorage.getValue(MetadataKey.DeviceSerialNumber)
    )
    const token = String(this.keyStorage.getValue(MetadataKey.DeviceToken))

    if (this.deviceManager.device.locked) {
      return true
    }

    if (
      !this.contactIndexer ||
      !this.messageIndexer ||
      !this.threadIndexer ||
      !this.templateIndexer
    ) {
      return false
    }

    if (!token || !serialNumber) {
      return false
    }

    const syncFileDir = path.join(getAppPath(), "sync", serialNumber)
    const { ok, data } = await this.deviceBackupService.createBackup(
      {
        token,
        extract: true,
        cwd: syncFileDir,
      },
      BackupCategory.Sync
    )

    if (!ok || data === undefined) {
      return false
    }

    const contactIndex = await this.contactIndexer.index(syncFileDir, token)
    const messageIndex = await this.messageIndexer.index(syncFileDir, token)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const templateIndex = await this.templateIndexer.index(syncFileDir, token)
    const threadIndex = await this.threadIndexer.index(syncFileDir, token)

    this.index.set(DataIndex.Contact, contactIndex)
    this.index.set(DataIndex.Message, messageIndex)
    this.index.set(DataIndex.Template, templateIndex)
    this.index.set(DataIndex.Thread, threadIndex)

    return true
  }
}

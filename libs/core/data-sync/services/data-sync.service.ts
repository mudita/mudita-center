/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { IndexStorage } from "Core/index-storage/types"
import { DataIndex } from "Core/index-storage/constants"
import { DeviceProtocol } from "device-protocol/feature"
import { MetadataStore } from "Core/metadata/services"
import {
  ContactIndexer,
  MessageIndexer,
  TemplateIndexer,
  ThreadIndexer,
} from "Core/data-sync/indexes"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import {
  ContactPresenter,
  MessagePresenter,
  TemplatePresenter,
  ThreadPresenter,
} from "Core/data-sync/presenters"
import { SyncBackupCreateService } from "Core/backup/services/sync-backup-create.service"
import { InitializeOptions } from "Core/data-sync/types"

export class DataSyncService {
  private contactIndexer: ContactIndexer | null = null
  private messageIndexer: MessageIndexer | null = null
  private threadIndexer: ThreadIndexer | null = null
  private templateIndexer: TemplateIndexer | null = null
  private syncBackupCreateService: SyncBackupCreateService

  constructor(
    private index: IndexStorage,
    private deviceProtocol: DeviceProtocol,
    private keyStorage: MetadataStore,
    private fileSystemStorage: FileSystemService
  ) {
    this.syncBackupCreateService = new SyncBackupCreateService(
      this.deviceProtocol,
      new DeviceFileSystemService(this.deviceProtocol),
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

  public async indexAll({
    token,
    serialNumber,
    backupDirectory,
  }: InitializeOptions): Promise<boolean> {
    if (
      !this.contactIndexer ||
      !this.messageIndexer ||
      !this.threadIndexer ||
      !this.templateIndexer
    ) {
      return false
    }

    let syncFileDir = backupDirectory

    if (!syncFileDir) {
      syncFileDir = path.join(getAppPath(), "sync", serialNumber)

      const { ok } = await this.syncBackupCreateService.createSyncBackup(
        {
          token,
          extract: true,
          cwd: syncFileDir,
        },
        serialNumber
      )

      if (!ok) {
        return false
      }
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

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
  AlarmIndexer,
  CallLogIndexer,
  ContactIndexer,
  MessageIndexer,
  NoteIndexer,
  QuotationsIndexer,
  TemplateIndexer,
  ThreadIndexer,
} from "Core/data-sync/indexes"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import {
  AlarmPresenter,
  CallLogPresenter,
  ContactPresenter,
  MessagePresenter,
  NotePresenter,
  QuotationsPresenter,
  TemplatePresenter,
  ThreadPresenter,
} from "Core/data-sync/presenters"
import { SyncBackupCreateService } from "Core/backup/services/sync-backup-create.service"
import { InitializeOptions } from "Core/data-sync/types"
import { ElasticlunrFactory } from "Core/index-storage/factories"
import { BaseIndexer } from "Core/data-sync/indexes/base.indexer"

const defaultRequiredIndexes: DataIndex[] = [
  DataIndex.Contact,
  DataIndex.Message,
  DataIndex.Template,
  DataIndex.Thread,
]

export class DataSyncService {
  private contactIndexer: ContactIndexer | null = null
  private messageIndexer: MessageIndexer | null = null
  private threadIndexer: ThreadIndexer | null = null
  private templateIndexer: TemplateIndexer | null = null
  private callLogIndexer: CallLogIndexer | null = null
  private alarmIndexer: AlarmIndexer | null = null
  private noteIndexer: NoteIndexer | null = null
  private quotationsIndexer: QuotationsIndexer | null = null
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
    this.callLogIndexer = new CallLogIndexer(
      this.fileSystemStorage,
      new CallLogPresenter()
    )
    this.alarmIndexer = new AlarmIndexer(
      this.fileSystemStorage,
      new AlarmPresenter()
    )
    this.noteIndexer = new NoteIndexer(
      this.fileSystemStorage,
      new NotePresenter()
    )
    this.quotationsIndexer = new QuotationsIndexer(
      this.fileSystemStorage,
      new QuotationsPresenter()
    )
  }

  public async indexAll({
    token,
    serialNumber,
    backupDirectory,
    requiredIndexes = defaultRequiredIndexes,
  }: InitializeOptions): Promise<boolean> {
    if (
      !this.contactIndexer ||
      !this.messageIndexer ||
      !this.threadIndexer ||
      !this.templateIndexer ||
      !this.callLogIndexer ||
      !this.alarmIndexer ||
      !this.noteIndexer
    ) {
      return false
    }

    const syncFileDir =
      backupDirectory ?? path.join(getAppPath(), "sync", serialNumber)

    if (!backupDirectory) {
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

    const isRequired = (index: DataIndex) => requiredIndexes.includes(index)

    const indexers = {
      [DataIndex.Contact]: this.contactIndexer,
      [DataIndex.Message]: this.messageIndexer,
      [DataIndex.Template]: this.templateIndexer,
      [DataIndex.Thread]: this.threadIndexer,
      [DataIndex.CallLog]: this.callLogIndexer,
      [DataIndex.Alarm]: this.alarmIndexer,
      [DataIndex.Note]: this.noteIndexer,
      [DataIndex.Quotations]: this.quotationsIndexer,
    }

    const indexOrEmptyOnFailure = async (
      indexName: DataIndex,
      indexer: BaseIndexer | null
    ) => {
      try {
        return await indexer!.index(syncFileDir, token)
      } catch (error) {
        if (!isRequired(indexName)) {
          return ElasticlunrFactory.create()
        }
        throw error
      }
    }

    for (const [indexName, indexer] of Object.entries(indexers)) {
      const index = await indexOrEmptyOnFailure(indexName as DataIndex, indexer)
      this.index.set(indexName as DataIndex, index)
    }

    return true
  }
}

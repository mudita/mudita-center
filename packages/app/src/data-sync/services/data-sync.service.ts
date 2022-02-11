/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import {
  ContactIndexer,
  MessageIndexer,
  ThreadIndexer,
} from "App/data-sync/indexes"
import {
  ContactPresenter,
  MessagePresenter,
  ThreadPresenter,
} from "App/data-sync/presenters"
import { DataIndex } from "App/data-sync/constants"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"
import DeviceService from "Backend/device-service"
import { DataSyncClass } from "App/data-sync/services/data-sync-class.interface"
import path from "path"
import getAppPath from "App/main/utils/get-app-path"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { SyncFileSystemService } from "App/data-sync/services/sync-file-system.service"

const syncCatalogName = "sync"
const cacheCatalogName = "cache"
const cacheFileDir = path.join(getAppPath(), cacheCatalogName)

const cacheFilePaths: Record<DataIndex, string> = {
  [DataIndex.Contact]: path.join(cacheFileDir, "contacts.json"),
  [DataIndex.Message]: path.join(cacheFileDir, "messages.json"),
  [DataIndex.Thread]: path.join(cacheFileDir, "threads.json"),
}

export class DataSync implements DataSyncClass {
  private token = ""
  private contactIndexer: ContactIndexer | null = null
  private messageIndexer: MessageIndexer | null = null
  private threadIndexer: ThreadIndexer | null = null
  private syncFileSystemService: SyncFileSystemService | null = null
  public indexesMap: Map<DataIndex, Index<any>> = new Map()

  constructor(
    private deviceService: DeviceService,
    private deviceBackup: DeviceBackupAdapter
  ) {}

  initialize(token: string): void {
    this.token = token

    this.syncFileSystemService = new SyncFileSystemService(token)
    this.contactIndexer = new ContactIndexer(
      this.syncFileSystemService,
      new ContactPresenter()
    )
    this.messageIndexer = new MessageIndexer(
      this.syncFileSystemService,
      new MessagePresenter()
    )
    this.threadIndexer = new ThreadIndexer(
      this.syncFileSystemService,
      new ThreadPresenter()
    )
  }

  async indexAll(): Promise<void> {
    if (this.deviceBackup.backuping) {
      return
    }

    if (!this.deviceService.currentDeviceUnlocked) {
      return
    }

    if (!this.contactIndexer || !this.messageIndexer || !this.threadIndexer) {
      return
    }

    if (!this.syncFileSystemService) {
      return
    }

    const syncFileDir = path.join(getAppPath(), syncCatalogName)
    const { status, data } = await this.deviceBackup.downloadDeviceBackup({
      token: this.token,
      extract: true,
      cwd: syncFileDir,
    })

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return
    }

    try {
      const contactIndex = await this.contactIndexer.index(syncFileDir)
      const messageIndex = await this.messageIndexer.index(syncFileDir)
      const threadIndex = await this.threadIndexer.index(syncFileDir)

      this.syncFileSystemService.writeFileSync(
        cacheFilePaths[DataIndex.Contact],
        contactIndex
      )
      this.syncFileSystemService.writeFileSync(
        cacheFilePaths[DataIndex.Message],
        messageIndex
      )
      this.syncFileSystemService.writeFileSync(
        cacheFilePaths[DataIndex.Thread],
        threadIndex
      )

      this.indexesMap.set(DataIndex.Contact, contactIndex)
      this.indexesMap.set(DataIndex.Message, messageIndex)
      this.indexesMap.set(DataIndex.Thread, threadIndex)
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }
}

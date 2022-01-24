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
import { extract } from "App/data-sync/helpers"
import { unlinkSync } from "App/file-system/listeners"

const syncCatalogName = "sync"

export class DataSync implements DataSyncClass {
  private contactIndexer: ContactIndexer | null = null
  private messageIndexer: MessageIndexer | null = null
  private threadIndexer: ThreadIndexer | null = null
  public indexesMap: Map<DataIndex, Index<any>> = new Map()

  constructor(
    private deviceService: DeviceService,
    private deviceBackup: DeviceBackupAdapter
  ) {}

  initialize(): void {
    this.contactIndexer = new ContactIndexer(new ContactPresenter())
    this.messageIndexer = new MessageIndexer(new MessagePresenter())
    this.threadIndexer = new ThreadIndexer(new ThreadPresenter())
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

    const { status, data } =
      await this.deviceBackup.downloadDeviceBackupLocally(syncCatalogName)

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return
    }

    const fileDir = path.join(getAppPath(), syncCatalogName)

    try {
      await extract(data[0], { C: fileDir })
      await unlinkSync(data[0])
    } catch {
      return
    }

    try {
      const contactIndex = await this.contactIndexer.index(fileDir)
      const messageIndex = await this.messageIndexer.index(fileDir)
      const threadIndex = await this.threadIndexer.index(fileDir)

      this.indexesMap.set(DataIndex.Contact, contactIndex)
      this.indexesMap.set(DataIndex.Message, messageIndex)
      this.indexesMap.set(DataIndex.Thread, threadIndex)
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }
}

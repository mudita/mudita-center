/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { ContactIndexer } from "App/data-sync/indexes"
import { ContactPresenter } from "App/data-sync/presenters"
import { DataIndex } from "App/data-sync/constants"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"
import DeviceService from "Backend/device-service"

export class DataSync {
  private contactIndexer: ContactIndexer | null = null
  public indexesMap: Map<DataIndex, Index<any>> = new Map()

  constructor(
    private deviceService: DeviceService,
    private deviceBackup: DeviceBackupAdapter
  ) {}

  initialize() {
    this.contactIndexer = new ContactIndexer(
      new ContactPresenter()
    )
  }

  async indexAll(): Promise<void> {
    if (this.deviceBackup.backuping) {
      return
    }

    if (!this.deviceService.currentDeviceUnlocked) {
      return
    }

    if (!this.contactIndexer) {
      return
    }

    const index = await this.contactIndexer.index()

    this.indexesMap.set(DataIndex.Contact, index)
  }
}

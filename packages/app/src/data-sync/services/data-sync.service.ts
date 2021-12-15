/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { ipcMain } from "electron-better-ipc"
import { DeviceServiceEventName } from "Backend/device-service"
import { ContactIndexer } from "App/data-sync/indexes"
import { ContactPresenter } from "App/data-sync/presenters"
import { DataIndex, IpcDataSyncEvent } from "App/data-sync/constants"
import { DeviceFileSystemService } from "Backend/device-file-system-service/device-file-system-service"

export class DataSync {
  private contactIndexer: ContactIndexer | null = null
  public indexesMap: Map<DataIndex, Index<any>> = new Map()

  constructor(private deviceFileSystem: DeviceFileSystemService) {}

  initialize() {
    this.contactIndexer = new ContactIndexer(
      this.deviceFileSystem,
      new ContactPresenter()
    )

    this.deviceFileSystem.deviceService.on(
      DeviceServiceEventName.DeviceConnected,
      async () => {
        if (!this.contactIndexer) {
          return
        }

        this.indexesMap.set(
          DataIndex.Contact,
          await this.contactIndexer.index()
        )

        ipcMain.callFocusedRenderer(
          IpcDataSyncEvent.DataUpdated,
          this.indexesMap
        )
      }
    )
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { DeviceBackup } from "App/__deprecated__/backend/adapters/device-backup/device-backup.adapter"
import { DeviceBackupService } from "App/__deprecated__/backend/device-backup-service/device-backup-service"
import { DeviceBaseInfo } from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"
import { DeviceFileSystem } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system.adapter"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import { IndexStorage } from "App/index-storage/types"
import { DataIndex } from "App/index-storage/constants"
import { DeviceService } from "App/__deprecated__/backend/device-service"
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
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export class DataSyncService {
  private contactIndexer: ContactIndexer | null = null
  private messageIndexer: MessageIndexer | null = null
  private threadIndexer: ThreadIndexer | null = null
  private templateIndexer: TemplateIndexer | null = null
  // TODO implement device backup service and use it instead of adapter
  private deviceBackupService: DeviceBackup

  constructor(
    private index: IndexStorage,
    private deviceService: DeviceService,
    private keyStorage: MetadataStore,
    private fileSystemStorage: FileSystemService
  ) {
    this.deviceBackupService = new DeviceBackup(
      new DeviceBaseInfo(this.deviceService),
      new DeviceBackupService(this.deviceService),
      new DeviceFileSystem(this.deviceService)
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

    if (!this.deviceService.currentDeviceUnlocked) {
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
    const { status, data } =
      await this.deviceBackupService.downloadDeviceBackup({
        token,
        extract: true,
        cwd: syncFileDir,
      })

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return false
    }

    const contactIndex = await this.contactIndexer.index(syncFileDir, token)
    const messageIndex = await this.messageIndexer.index(syncFileDir, token)
    const templateIndex = await this.templateIndexer.index(syncFileDir, token)
    const threadIndex = await this.threadIndexer.index(syncFileDir, token)

    this.index.set(DataIndex.Contact, contactIndex)
    this.index.set(DataIndex.Message, messageIndex)
    this.index.set(DataIndex.Template, templateIndex)
    this.index.set(DataIndex.Thread, threadIndex)

    return true
  }
}

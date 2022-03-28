/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { IndexStorage } from "App/index-storage/types"
import { DeviceService } from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/main/utils/logger"
import { Controller } from "./controller.type"
import { Model } from "./model.type"
import { Repository } from "./repository.type"
import { Observer } from "./observer.type"

export interface Module {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (
    index: IndexStorage,
    deviceService: DeviceService,
    keyStorage: MetadataStore,
    logger: AppLogger,
    ipc: MainProcessIpc,
    eventEmitter: EventEmitter,
    fileSystem: FileSystemService
  ): {
    controllers: Controller[]
    models: Model[]
    repositories: Repository[]
    observers: Observer[]
  }
}

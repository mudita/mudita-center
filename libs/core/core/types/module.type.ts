/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { IndexStorage } from "Core/index-storage/types"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { Controller } from "./controller.type"
import { Model } from "./model.type"
import { Repository } from "./repository.type"
import { Observer } from "./observer.type"
import { Initializer } from "./initializer.type"
import { DeviceProtocol } from "device-protocol/feature"

export interface Module {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (
    index: IndexStorage,
    deviceProtocol: DeviceProtocol,
    keyStorage: MetadataStore,
    logger: AppLogger,
    ipc: MainProcessIpc,
    eventEmitter: EventEmitter,
    fileSystem: FileSystemService,
    mainApplicationWindow: BrowserWindow
  ): {
    controllers: Controller[]
    models: Model[]
    repositories: Repository[]
    observers: Observer[]
    initializers: Initializer[]
  }
}

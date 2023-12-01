/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { IndexStorage } from "App/index-storage/types"
import { DeviceManager } from "App/device-manager/services"
import {
  Controller,
  Model,
  Repository,
  Observer,
  Initializer,
} from "App/core/types"

export class BaseModule {
  public controllers: Controller[] = []
  public models: Model[] = []
  public repositories: Repository[] = []
  public observers: Observer[] = []
  public initializers: Initializer[] = []

  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {}
}

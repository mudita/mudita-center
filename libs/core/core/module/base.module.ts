/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "Core/metadata/services"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { IndexStorage } from "Core/index-storage/types"
import { DeviceProtocolService } from "device-protocol/feature"
import {
  Controller,
  Model,
  Repository,
  Observer,
  Initializer,
} from "Core/core/types"

export class BaseModule {
  public controllers: Controller[] = []
  public models: Model[] = []
  public repositories: Repository[] = []
  public observers: Observer[] = []
  public initializers: Initializer[] = []

  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceProtocolService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {}
}

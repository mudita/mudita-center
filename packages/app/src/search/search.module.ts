/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import {
  MessageSearcher,
  ThreadSearcher,
  ContactSearcher,
  TemplateSearcher,
} from "App/search/searchers"
import { SearcherMediator } from "App/search/mediators"
import { SearchService } from "App/search/services/search.service"
import { SearchController } from "App/search/controllers/search.controller"
import { DeviceManager } from "App/device-manager/services"

export class SearchModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceManager,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const messageSearcher = new MessageSearcher(this.index)
    const threadSearcher = new ThreadSearcher(this.index)
    const contactSearcher = new ContactSearcher(this.index)
    const templateSearcher = new TemplateSearcher(this.index)
    const searcherMediator = new SearcherMediator(
      messageSearcher,
      threadSearcher,
      contactSearcher,
      templateSearcher
    )
    const searchService = new SearchService(searcherMediator)
    const searchController = new SearchController(searchService)

    this.controllers = [searchController]
  }
}

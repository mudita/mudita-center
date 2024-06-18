/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { IndexStorage } from "Core/index-storage/types"
import { BaseModule } from "Core/core/module"
import {
  MessageSearcher,
  ThreadSearcher,
  ContactSearcher,
  TemplateSearcher,
} from "Core/search/searchers"
import { SearcherMediator } from "Core/search/mediators"
import { SearchService } from "Core/search/services/search.service"
import { SearchController } from "Core/search/controllers/search.controller"
import { DeviceProtocol } from "device-protocol/feature"

export class SearchModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceProtocol: DeviceProtocol,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceProtocol,
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

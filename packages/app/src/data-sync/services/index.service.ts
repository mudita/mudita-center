/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataSync } from "App/data-sync/services/data-sync.service"
import { DataIndex } from "App/data-sync/constants"

export class IndexService {
  constructor(private dataSync: DataSync) {}

  init() {
    this.dataSync.initialize()
  }

  indexAll(): Promise<void> {
    return this.dataSync.indexAll()
  }

  getIndex(indexName: DataIndex): SerialisedIndexData<unknown> | undefined {
    return this.dataSync.indexesMap.get(indexName)?.toJSON()
  }
}

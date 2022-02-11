/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataSyncClass } from "App/data-sync/services/data-sync-class.interface"
import { DataIndex } from "App/data-sync/constants"
import { IndexClass } from "App/data-sync/services/index-class.interface"

export class IndexService implements IndexClass {
  constructor(private dataSync: DataSyncClass) {}

  initialize(token: string): Promise<boolean> {
    return this.dataSync.initialize(token)
  }

  indexAll(): Promise<void> {
    return this.dataSync.indexAll()
  }

  getIndex(indexName: DataIndex): SerialisedIndexData<unknown> | undefined {
    return this.dataSync.indexesMap.get(indexName)
  }
}

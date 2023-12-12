/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataSyncClass } from "Core/data-sync/services/data-sync-class.interface"
import { DataIndex } from "Core/data-sync/constants"
import { IndexClass } from "Core/data-sync/services/index-class.interface"
import { InitializeOptions } from "Core/data-sync/types"

export class IndexService implements IndexClass {
  constructor(private dataSync: DataSyncClass) {}

  initialize(options: InitializeOptions): Promise<boolean> {
    return this.dataSync.initialize(options)
  }

  indexAll(): Promise<void> {
    return this.dataSync.indexAll()
  }

  getIndex(indexName: DataIndex): SerialisedIndexData<unknown> | undefined {
    return this.dataSync.indexesMap.get(indexName)
  }
}

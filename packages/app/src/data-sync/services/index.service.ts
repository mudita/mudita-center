/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData, SearchConfig } from "elasticlunr"
import { DataSync } from "App/data-sync/services/data-sync.service"
import { DataIndex } from "App/data-sync/constants"
import { ContactObject } from "App/data-sync/types"

export class IndexService {
  constructor(private dataSync: DataSync) {}

  init() {
    this.dataSync.initialize()
  }

  getIndex(indexName: DataIndex): SerialisedIndexData<any> | undefined {
    return this.dataSync.indexesMap.get(indexName)?.toJSON()
  }

  search(
    indexName: DataIndex,
    search: string,
    config?: SearchConfig<ContactObject>
  ): ContactObject[] {
    const index = this.dataSync.indexesMap.get(indexName)

    if (!index) {
      return []
    }

    const filteredResults = index.search(search, config)

    if (!filteredResults?.length) {
      return []
    }

    return filteredResults.map((result) =>
      index.documentStore.getDoc(result.ref)
    )
  }
}

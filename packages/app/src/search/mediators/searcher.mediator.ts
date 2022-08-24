/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/index-storage/constants"
import { BaseSearcher } from "App/search/searchers"

export class SearcherMediator {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private searchersMap: Map<DataIndex, BaseSearcher> = new Map()

  constructor(private messageSearcher: BaseSearcher) {
    this.searchersMap.set(DataIndex.Message, this.messageSearcher)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchByScope(scope: DataIndex, query: string): any[] | undefined {
    return this.searchersMap.get(scope)?.search(query)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { DataIndex } from "App/index-storage/constants"
import { BaseSearcher } from "App/search/searchers"
import { SearcherError } from "App/search/constants"

export class SearcherMediator {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private searchersMap: Map<DataIndex, BaseSearcher> = new Map()

  constructor(
    private messageSearcher: BaseSearcher,
    private threadSearcher: BaseSearcher,
    private contactSearcher: BaseSearcher,
    private templateSearcher: BaseSearcher
  ) {
    this.searchersMap.set(DataIndex.Message, this.messageSearcher)
    this.searchersMap.set(DataIndex.Thread, this.threadSearcher)
    this.searchersMap.set(DataIndex.Contact, this.contactSearcher)
    this.searchersMap.set(DataIndex.Template, this.templateSearcher)
  }

  public searchByScope<Model>(
    scope: DataIndex,
    query: string
  ): Model[] | undefined {
    const searchers = this.searchersMap.get(scope)

    if (!searchers) {
      throw new AppError(
        SearcherError.SearcherDoesntExists,
        `Searcher: ${scope} can't be found`
      )
    }

    return searchers.search(query) as Model[]
  }
}

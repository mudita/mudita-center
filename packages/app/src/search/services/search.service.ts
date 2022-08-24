/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { SearchParams, SearchResult } from "App/search/dto"
import { SearcherMediator } from "App/search/mediators"

export class SearchService {
  constructor(private searcherMediator: SearcherMediator) {}

  public search(params: SearchParams): ResultObject<SearchResult> {
    const result = params.scope.reduce((acc: SearchResult, value) => {
      acc[value] = this.searcherMediator.searchByScope(value, params.query)

      return acc
    }, {})

    return Result.success(result)
  }
}

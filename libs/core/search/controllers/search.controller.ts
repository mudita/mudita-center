/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { IpcSearchEvent } from "Core/search/constants"
import { SearchParams, SearchResult } from "Core/search/dto"
import { SearchService } from "Core/search/services"

export class SearchController {
  constructor(private searchService: SearchService) {}

  @IpcEvent(IpcSearchEvent.SearchData)
  public searchData(
    data: SearchParams
  ): ResultObject<SearchResult | undefined> {
    return this.searchService.search(data)
  }
}

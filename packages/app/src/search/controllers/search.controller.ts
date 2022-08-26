/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import { SearchControllerPrefix, IpcSearchEvent } from "App/search/constants"
import { SearchParams, SearchResult } from "App/search/dto"
import { SearchService } from "App/search/services"

@Controller(SearchControllerPrefix)
export class SearchController {
  constructor(private searchService: SearchService) {}

  @IpcEvent(IpcSearchEvent.SearchData)
  public searchData(
    data: SearchParams
  ): ResultObject<SearchResult | undefined> {
    return this.searchService.search(data)
  }
}

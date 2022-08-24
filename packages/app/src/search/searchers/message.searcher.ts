/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { AppError } from "App/core/errors"
import { DataIndex } from "App/index-storage/constants"
import { SearcherError } from "App/search/constants"
import { BaseSearcher } from "App/search/searchers/base.searcher"

export class MessageSearcher extends BaseSearcher {
  public search<Message>(query: string): Message[] | undefined {
    const index = this.index.get(DataIndex.Message) as Index<Message>

    if (!index) {
      throw new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Message} can't be found`
      )
    }

    const result = index.search(query)
    return this.hydrate(index, result)
  }
}

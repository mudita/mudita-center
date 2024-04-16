/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { AppError } from "Core/core/errors"
import { DataIndex } from "Core/index-storage/constants"
import { Thread } from "Core/messages/dto"
import { SearcherError } from "Core/search/constants"
import { BaseSearcher } from "Core/search/searchers/base.searcher"

export class ThreadSearcher extends BaseSearcher {
  public search(query: string): Thread[] | undefined {
    const index = this.index.get(DataIndex.Thread) as Index<Thread>

    if (!index) {
      throw new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Thread} can't be found`
      )
    }

    const result = index.search(query, {
      expand: true,
      fields: {
        phoneNumber: {
          boost: 3,
        },
        contactName: {
          boost: 2,
        },
        messageSnippet: {
          boost: 1,
        },
      },
    })

    return this.hydrate(index, result)
  }
}

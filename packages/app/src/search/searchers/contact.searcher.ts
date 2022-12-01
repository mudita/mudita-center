/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { AppError } from "App/core/errors"
import { DataIndex } from "App/index-storage/constants"
import { Contact } from "App/contacts/dto"
import { SearcherError } from "App/search/constants"
import { BaseSearcher } from "App/search/searchers/base.searcher"

export class ContactSearcher extends BaseSearcher {
  public search(query: string): Contact[] | undefined {
    const index = this.index.get(DataIndex.Contact) as Index<Contact>

    if (!index) {
      throw new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Contact} can't be found`
      )
    }

    const result = index.search(query, { expand: true })

    return this.hydrate(index, result)
  }
}

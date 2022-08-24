/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index, SearchResults } from "elasticlunr"
import { IndexStorage } from "App/index-storage/types"

export abstract class BaseSearcher {
  constructor(public index: IndexStorage) {}

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract search(query: string): any[] | undefined

  protected hydrate<Type>(
    index: Index<Type>,
    searchResults: SearchResults[]
  ): Type[] {
    return searchResults.map(({ ref }) => index.documentStore.getDoc(ref))
  }
}

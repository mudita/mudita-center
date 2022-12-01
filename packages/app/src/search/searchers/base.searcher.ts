/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index, SearchResults } from "elasticlunr"
import { IndexStorage } from "App/index-storage/types"

export abstract class BaseSearcher {
  constructor(protected index: IndexStorage) {}

  abstract search(query: string): unknown[] | undefined
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-types
  protected hydrate<Model extends {}>(
    index: Index<Model>,
    searchResults: SearchResults[]
  ): Model[] {
    return searchResults.map(({ ref }) => index.documentStore.getDoc(ref))
  }
}

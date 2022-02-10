/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "App/data-sync/constants"

export interface IndexClass {
  initialize(token: string): void
  indexAll(): Promise<void>
  getIndex(indexName: DataIndex): SerialisedIndexData<unknown> | undefined
}

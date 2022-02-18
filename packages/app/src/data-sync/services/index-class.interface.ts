/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "App/data-sync/constants"
import { InitializeOptions } from "App/data-sync/types"

export interface IndexClass {
  initialize(options: InitializeOptions): void
  indexAll(): Promise<void>
  getIndex(indexName: DataIndex): SerialisedIndexData<unknown> | undefined
}

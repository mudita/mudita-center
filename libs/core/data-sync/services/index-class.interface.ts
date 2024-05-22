/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "Core/data-sync/constants"
import { InitializeOptions } from "Core/data-sync/types"

export interface IndexClass {
  initialize(options: InitializeOptions): void
  indexAll(): Promise<void>
  getIndex(indexName: DataIndex): SerialisedIndexData<unknown> | undefined
}

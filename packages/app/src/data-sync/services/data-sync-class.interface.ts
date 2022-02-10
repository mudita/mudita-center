/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/data-sync"
import { Index } from "elasticlunr"

export interface DataSyncClass {
  indexesMap: Map<DataIndex, Index<any>>
  initialize(token: string): void
  indexAll(): Promise<void>
}

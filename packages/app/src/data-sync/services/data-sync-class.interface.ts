/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "App/data-sync/constants"
import { InitializeOptions } from "App/data-sync/types"

export interface DataSyncClass {
  indexesMap: Map<DataIndex, SerialisedIndexData<any>>
  initialize(options: InitializeOptions): Promise<boolean>
  indexAll(): Promise<void>
}

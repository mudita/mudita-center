/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "App/data-sync/constants"

export interface DataSyncClass {
  indexesMap: Map<DataIndex, SerialisedIndexData<any>>
  initialize(token: string): Promise<boolean>
  indexAll(): Promise<void>
}

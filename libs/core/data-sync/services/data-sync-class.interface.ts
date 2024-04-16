/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "Core/data-sync/constants"
import { InitializeOptions } from "Core/data-sync/types"

export interface DataSyncClass {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indexesMap: Map<DataIndex, SerialisedIndexData<any>>
  initialize(options: InitializeOptions): Promise<boolean>
  indexAll(): Promise<void>
}

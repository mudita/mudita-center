/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index, SerialisedIndexData } from "elasticlunr"
import { DataIndex } from "App/index-storage/constants"

// FIXME: try to restore Index<any> instead of the SerialisedIndexData<any> during read cache
export type IndexStorage = Map<DataIndex, Index<any> | SerialisedIndexData<any>>

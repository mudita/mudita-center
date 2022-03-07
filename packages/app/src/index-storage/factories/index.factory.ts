/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { IndexStorage } from "App/index-storage/types"
import { DataIndex } from "App/index-storage/constants"

export class IndexFactory {
  public create(): IndexStorage {
    return new Map<DataIndex, Index<any>>()
  }
}

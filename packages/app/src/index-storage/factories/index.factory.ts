/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexStorage } from "App/index-storage/types"

export class IndexFactory {
  public create(): IndexStorage {
    return new Map()
  }
}

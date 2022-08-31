/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SeedDataResult, SeedParams } from "../types"

export interface SeedService {
  seed(data: SeedParams): Promise<SeedDataResult>
  removeSeededData(data: SeedDataResult): Promise<void>
}

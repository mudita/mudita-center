/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SpawnSyncReturns } from "child_process"

export interface FlashDeviceCommandClass {
  exec(imagePath: string): Promise<SpawnSyncReturns<Buffer>>
}

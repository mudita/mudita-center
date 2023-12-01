/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SpawnSyncReturns } from "child_process"

export interface DecompressTarCommandClass {
  exec(
    archivePath: string,
    destinationDirectory: string
  ): Promise<SpawnSyncReturns<Buffer>>
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"

export interface SyncFileSystemClass {
  readFileSync(filePath: string): Buffer | undefined | null
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeIndexSync(filePath: string, index: SerialisedIndexData<any>): void
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readIndexSync(filePath: string): SerialisedIndexData<any>
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"

export interface SyncFileSystemClass {
  readFileSync(filePath: string): Buffer | undefined | null
  writeIndexSync(filePath: string, index: SerialisedIndexData<any>): void
  readIndexSync(filePath: string): SerialisedIndexData<any>
}

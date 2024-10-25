/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "Core/index-storage/constants"

export interface InitializeOptions {
  token?: string
  serialNumber: string
  backupDirectory?: string
  requiredIndexes?: DataIndex[]
}

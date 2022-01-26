/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"
import { FileType } from "App/files-manager/constants"

export interface DiskSpaceCategory {
  fileType: FileType
  megabyteSize: number
  filesAmount?: number
  color: string
  icon: Type
}

export interface MemorySpaceCategory {
  free: number
  full: number
}

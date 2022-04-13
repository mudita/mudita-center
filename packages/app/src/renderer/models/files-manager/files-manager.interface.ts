/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "Renderer/components/core/icon/icon-type"

export interface DiskSpaceCategory {
  filesType: string
  occupiedMemory: number
  filesAmount?: number
  color: string
  icon: IconType
  url?: string
  free?: boolean
}

export interface FilesManagerState {
  memoryData: DiskSpaceCategory[]
}

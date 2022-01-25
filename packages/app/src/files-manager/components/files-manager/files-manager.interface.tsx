/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"
import { FilesType } from "App/files-manager/constants/files-manager.enum"

export interface DiskSpaceCategory extends Item {
  filesType: FilesType
  occupiedMemory?: number
  filesAmount?: number
  color: string
  icon: Type
}

export interface MemorySpaceCategory {
  free: number
  full: number
}

export interface Item {
  filesType: FilesType
  filesAmount?: number
  color: string
  icon: Type
  free?: boolean
}

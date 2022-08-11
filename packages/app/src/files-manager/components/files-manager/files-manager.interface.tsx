/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { File } from "App/files-manager/dto"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { DeviceDirectory } from "App/files-manager/constants"

export interface FilesManagerProps {
  deviceType: DeviceType | null
  memorySpace?: MemorySpace
  resultState: ResultState
  files: File[]
  getFiles: (directory: DeviceDirectory) => void
}

export interface DiskSpaceCategory {
  type: DiskSpaceCategoryType
  size: number
  filesAmount?: number
  color: string
  icon: IconType
  label: string
}

export interface MemorySpace {
  reservedSpace: number
  usedUserSpace: number
  total: number
}

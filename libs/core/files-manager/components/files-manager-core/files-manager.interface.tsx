/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DiskSpaceCategoryType } from "Core/files-manager/constants"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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

export interface FileServiceState {
  deleting: boolean
  deletingConfirmation: boolean
  deletingInfo: boolean
  deletingFailed: boolean
  uploading: boolean
  uploadingInfo: boolean
}

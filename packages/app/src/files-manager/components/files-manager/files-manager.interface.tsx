/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { State } from "App/core/constants"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { File } from "App/files-manager/dto"
import { DeviceDirectory } from "App/files-manager/constants"

export interface FilesManagerProps {
  deviceType: DeviceType | null
  memorySpace?: MemorySpace
  loading: State
  uploading: State
  files: File[]
  getFiles: (directory: DeviceDirectory) => void
  error: Error | string | null
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  selectedItems: string[]
  allItemsSelected: boolean
  onDeleteFiles: () => void
  uploadFile: () => void
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
  free: number
  full: number
  total: number
}

export interface FileServiceState {
  creating: boolean
  creatingInfo: boolean
  updating: boolean
  updatingInfo: boolean
  deleting: boolean
  deletingConfirmation: boolean
  deletingInfo: boolean
  updatingOrder: boolean
  updatingOrderInfo: boolean
}

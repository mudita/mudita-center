/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFileCategory } from "devices/common/ui"
import { ISegmentBarItem } from "app-theme/ui"
import {
  EntityData,
  McFileManagerConfigResponse,
  McFileManagerDataResponse,
  StorageInformation,
} from "devices/api-device/models"
import {
  FileCategoryId,
  FileManagerCategoryFileMap,
} from "./device-manage-files.types"
import { EMPTY_STORAGE_INFO } from "./device-manage-files.config"
import { mapToCategoryFileMap } from "./map-to-category-file-map"
import { mapToCategories } from "./map-to-categories"
import { mapToSegments } from "./map-to-segments"

export interface DeviceManageFilesData {
  categories: (FileManagerFileCategory & { id: FileCategoryId })[]
  segments: ISegmentBarItem[]
  categoryFileMap: FileManagerCategoryFileMap
  freeSpaceBytes: number
  usedSpaceBytes: number
  otherSpaceBytes: number
}

interface MapDeviceToManageFilesParams {
  featureData?: {
    data: McFileManagerDataResponse
    config: McFileManagerConfigResponse
  }
  entitiesData?: Record<string, EntityData[]>
}

export const mapDeviceToManageFiles = ({
  featureData,
  entitiesData = {},
}: MapDeviceToManageFilesParams = {}): DeviceManageFilesData => {
  const storageInformationList: StorageInformation[] =
    featureData?.data?.storageInformation ?? []
  const storageInformation: StorageInformation =
    storageInformationList[0] || EMPTY_STORAGE_INFO

  const categoryFileMap = mapToCategoryFileMap(
    entitiesData,
    storageInformation.path
  )

  const categories = mapToCategories(
    storageInformation,
    categoryFileMap,
    featureData?.config
  )

  const segments = mapToSegments(storageInformation, featureData?.config)

  return {
    categories,
    segments,
    categoryFileMap,
    otherSpaceBytes:
      storageInformation.categoriesSpaceInformation["otherFiles"]
        ?.spaceUsedBytes || 0,
    freeSpaceBytes: storageInformation.freeSpaceBytes,
    usedSpaceBytes: storageInformation.usedSpaceBytes,
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFileCategory } from "devices/common/ui"
import { ISegmentBarItem } from "app-theme/ui"
import {
  McFileManagerConfigResponse,
  McFileManagerDataResponse,
  StorageInformation,
} from "devices/api-device/models"
import { FileCategoryId } from "./device-manage-files.types"
import { EMPTY_STORAGE_INFO } from "./device-manage-files.config"
import { mapToCategories } from "./map-to-categories"
import { mapToSegments } from "./map-to-segments"

export interface DeviceManageFilesData {
  categories: (FileManagerFileCategory & { id: FileCategoryId })[]
  segments: ISegmentBarItem[]
  freeSpaceBytes: number
  usedSpaceBytes: number
  otherSpaceBytes: number
}

interface MapDeviceToManageFilesParams {
  featureData: {
    data: McFileManagerDataResponse
    config: McFileManagerConfigResponse
  }
  entitiesCountData: Record<string, number>
}

export const mapDeviceToManageFiles = ({
  featureData,
  entitiesCountData,
}: MapDeviceToManageFilesParams): DeviceManageFilesData => {
  const storageInformationList: StorageInformation[] =
    featureData?.data?.storageInformation ?? []
  const storageInformation: StorageInformation =
    storageInformationList[0] || EMPTY_STORAGE_INFO

  const categories = mapToCategories(
    storageInformation,
    entitiesCountData,
    featureData?.config
  )

  const segments = mapToSegments(storageInformation, featureData?.config)

  return {
    categories,
    segments,
    otherSpaceBytes:
      storageInformation.categoriesSpaceInformation["otherFiles"]
        ?.spaceUsedBytes || 0,
    freeSpaceBytes: storageInformation.freeSpaceBytes,
    usedSpaceBytes: storageInformation.usedSpaceBytes,
  }
}

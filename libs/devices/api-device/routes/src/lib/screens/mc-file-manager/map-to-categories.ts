/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes } from "app-theme/ui"
import {
  McFileManagerConfigResponse,
  StorageInformation,
} from "devices/api-device/models"
import { FileManagerFileCategory } from "devices/common/ui"
import { FileCategoryId } from "./device-manage-files.types"

export const mapToCategories = (
  storageInfo: StorageInformation,
  categoriesCountMap: Record<string, number>,
  featureConfig?: McFileManagerConfigResponse
): (FileManagerFileCategory & { id: FileCategoryId })[] => {
  const categories = featureConfig?.main?.config?.categories ?? []
  const categoriesSpaceInformation =
    storageInfo.categoriesSpaceInformation ?? {}

  return categories.map((category) => {
    const usedBytes =
      categoriesSpaceInformation[category.entityType]?.spaceUsedBytes ?? 0
    const count = categoriesCountMap[category.entityType] ?? 0

    return {
      id: category.entityType as FileCategoryId,
      icon: category.icon as FileManagerFileCategory["icon"],
      markerColor: category.markerColor,
      label: category.label,
      directoryPath: `${storageInfo.path}/${category.directoryPath}`,
      fileListEmptyStateDescription: category.fileListEmptyStateDescription,
      supportedFileTypes: category.supportedFileTypes,
      size: formatBytes(usedBytes, { minUnit: "KB" }),
      count,
    }
  })
}

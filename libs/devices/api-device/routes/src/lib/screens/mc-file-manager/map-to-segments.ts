/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes, ISegmentBarItem } from "app-theme/ui"
import {
  McFileManagerConfigResponse,
  StorageInformation,
} from "devices/api-device/models"
import { DEVICE_SEGMENTS_CONFIG_MAP } from "./device-manage-files.config"

const MIN_UNIT = "KB"

export const mapToSegments = (
  storageInformation: StorageInformation,
  featureConfig?: McFileManagerConfigResponse
): ISegmentBarItem[] => {
  const categoriesConfig = featureConfig?.main?.config?.categories ?? []
  const spaceInfo = storageInformation.categoriesSpaceInformation ?? {}

  const categorySegments: ISegmentBarItem[] = categoriesConfig.map(
    (category) => {
      const usedBytes = spaceInfo[category.entityType]?.spaceUsedBytes ?? 0
      return {
        color: category.markerColor,
        value: usedBytes,
        minWidth: 24,
        label: `${category.label} (${formatBytes(usedBytes, { minUnit: MIN_UNIT })})`,
      }
    }
  )

  const otherBytes = spaceInfo["otherFiles"]?.spaceUsedBytes ?? 0
  const freeBytes = storageInformation.freeSpaceBytes

  return [
    ...categorySegments,
    {
      ...DEVICE_SEGMENTS_CONFIG_MAP.otherFiles,
      value: otherBytes,
      label: `${DEVICE_SEGMENTS_CONFIG_MAP.otherFiles.label} (${formatBytes(otherBytes, { minUnit: MIN_UNIT })})`,
    },
    {
      ...DEVICE_SEGMENTS_CONFIG_MAP.free,
      value: freeBytes,
      label: `${DEVICE_SEGMENTS_CONFIG_MAP.free.label} (${formatBytes(freeBytes, { minUnit: MIN_UNIT })})`,
    },
  ]
}

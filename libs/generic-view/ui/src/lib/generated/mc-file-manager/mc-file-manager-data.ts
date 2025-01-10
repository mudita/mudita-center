/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  EntitiesLoaderConfig,
  Feature,
  McFileManagerData,
  segmentBarItemData,
} from "generic-view/models"
import { View } from "generic-view/utils"
import { formatBytes } from "../../texts/format-bytes"
import { SEGMENTS_CONFIG_MAP } from "./storage-summary-bar"

type StorageInformation = McFileManagerData["storageInformation"][number]

const isEntitiesLoaderConfig = (
  subview: unknown
): subview is EntitiesLoaderConfig => {
  return (
    typeof subview === "object" && subview !== null && "entityTypes" in subview
  )
}

const generateCategoryListItemStorageTexts = (
  key: string,
  entityTypes: string[],
  internalStorageInformation: StorageInformation
) => {
  return entityTypes.reduce((prevState, entityType, id) => {
    const categoriesSpaceInformation =
      internalStorageInformation.categoriesSpaceInformation[entityType]
    if (!categoriesSpaceInformation) {
      return prevState
    }

    prevState[`${key}${id}categoryListItemStorageText`] = {
      text: categoriesSpaceInformation.spaceUsedBytes,
    }

    return prevState
  }, {} as Record<string, unknown>)
}

const generateOtherFilesSpaceInformation = (
  key: string,
  storageInformation: StorageInformation
) => {
  const otherFilesSpaceInformation =
    storageInformation.categoriesSpaceInformation["otherFiles"]

  if (!otherFilesSpaceInformation) {
    return {}
  }

  return {
    [`${key}fileCategoryOtherFilesItemNameSize`]: {
      // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
      text: `(${formatBytes(otherFilesSpaceInformation.spaceUsedBytes, {
        minUnit: "KB",
      })})`,
    },
  }
}

const getSegmentBarItemData = (entityType: string, value: number) => {
  return {
    value,
    label: `${SEGMENTS_CONFIG_MAP[entityType].label} (${formatBytes(value, {
      minUnit: "KB",
    })})`,
  }
}

const generateStorageSummary = (
  key: string,
  entityTypes: string[],
  storageInformation: StorageInformation
) => {
  const segments: segmentBarItemData[] = []

  const dynamicSegmentValues = entityTypes
    .filter(
      (entityType) =>
        !!storageInformation.categoriesSpaceInformation[entityType]
    )
    .map((entityType) => {
      const { spaceUsedBytes } =
        storageInformation.categoriesSpaceInformation[entityType]

      return getSegmentBarItemData(entityType, spaceUsedBytes)
    })

  segments.push(...dynamicSegmentValues)

  const otherFilesSpaceInformation =
    storageInformation.categoriesSpaceInformation["otherFiles"]

  if (otherFilesSpaceInformation !== undefined) {
    const { spaceUsedBytes } =
      storageInformation.categoriesSpaceInformation["otherFiles"]

    segments.push(getSegmentBarItemData("otherFiles", spaceUsedBytes))
  }

  const freeTotalSpaceBytes =
    storageInformation.totalSpaceBytes - storageInformation.usedSpaceBytes

  segments.push(getSegmentBarItemData("free", freeTotalSpaceBytes))

  return {
    // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
    [`${key}storageSummaryUsedText`]: {
      text: `Used: ${formatBytes(storageInformation.usedSpaceBytes, {
        minUnit: "KB",
      })}`,
    },
    [`${key}storageSummaryFreeText`]: {
      text: freeTotalSpaceBytes,
    },
    [`${key}storageSummaryBar`]: {
      segments,
    },
  }
}

export const generateFileManagerData = (
  data: McFileManagerData,
  config: View
): Feature["data"] => {
  const entitiesLoaderConfig = config.fileManagerLoader.config
  const entityTypes = isEntitiesLoaderConfig(entitiesLoaderConfig)
    ? entitiesLoaderConfig.entityTypes
    : []

  return data.storageInformation.reduce(
    (acc, storageInformation, currentIndex) => {
      const pageKey = currentIndex.toString()
      return {
        ...acc,
        ...generateOtherFilesSpaceInformation(pageKey, storageInformation),
        ...generateCategoryListItemStorageTexts(
          pageKey,
          entityTypes,
          storageInformation
        ),
        ...generateStorageSummary(pageKey, entityTypes, storageInformation),
      }
    },
    {}
  )
}

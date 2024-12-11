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

const isEntitiesLoaderConfig = (
  subview: unknown
): subview is EntitiesLoaderConfig => {
  return (
    typeof subview === "object" && subview !== null && "entityTypes" in subview
  )
}

const findInternalStorageInformation = (
  storageInformation: McFileManagerData["storageInformation"]
) => {
  return storageInformation.find(
    (storage) => storage.storageType === "INTERNAL"
  )
}

const generateCategoryListItemStorageTexts = (
  entityTypes: string[],
  internalStorageInformation: NonNullable<
    ReturnType<typeof findInternalStorageInformation>
  >
) => {
  return entityTypes.reduce((prevState, entityType, id) => {
    const categoriesSpaceInformation =
      internalStorageInformation.categoriesSpaceInformation[entityType]
    if (!categoriesSpaceInformation) {
      return prevState
    }

    prevState[`${id}CategoryListItemStorageText`] = {
      text: categoriesSpaceInformation.spaceUsedBytes,
    }

    return prevState
  }, {} as Record<string, unknown>)
}

const generateOtherFilesSpaceInformation = (
  internalStorageInformation: NonNullable<
    ReturnType<typeof findInternalStorageInformation>
  >
) => {
  const otherFilesSpaceInformation =
    internalStorageInformation.categoriesSpaceInformation["otherFiles"]

  if (!otherFilesSpaceInformation) {
    return {}
  }

  return {
    fileCategoryOtherFilesItemNameSize: {
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
  entityTypes: string[],
  internalStorageInformation: NonNullable<
    ReturnType<typeof findInternalStorageInformation>
  >
) => {
  const segments: segmentBarItemData[] = []

  const dynamicSegmentValues = entityTypes
    .filter(
      (entityType) =>
        !!internalStorageInformation.categoriesSpaceInformation[entityType]
    )
    .map((entityType) => {
      const { spaceUsedBytes } =
        internalStorageInformation.categoriesSpaceInformation[entityType]

      return getSegmentBarItemData(entityType, spaceUsedBytes)
    })

  segments.push(...dynamicSegmentValues)

  const otherFilesSpaceInformation =
    internalStorageInformation.categoriesSpaceInformation["otherFiles"]

  if (otherFilesSpaceInformation !== undefined) {
    const { spaceUsedBytes } =
      internalStorageInformation.categoriesSpaceInformation["otherFiles"]

    segments.push(getSegmentBarItemData("otherFiles", spaceUsedBytes))
  }

  const freeTotalSpaceBytes =
    internalStorageInformation.totalSpaceBytes -
    internalStorageInformation.usedSpaceBytes

  segments.push(getSegmentBarItemData("free", freeTotalSpaceBytes))

  return {
    // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
    storageSummaryUsedText: {
      text: `Used: ${formatBytes(internalStorageInformation.usedSpaceBytes, {
        minUnit: "KB",
      })}`,
    },
    storageSummaryFreeText: {
      text: freeTotalSpaceBytes,
    },
    storageSummaryBar: {
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

  const internalStorageInformation = findInternalStorageInformation(
    data.storageInformation
  )

  if (!internalStorageInformation) {
    return {}
  }

  const categoryListItemStorageTexts = generateCategoryListItemStorageTexts(
    entityTypes,
    internalStorageInformation
  )

  const otherFilesSpaceInformation = generateOtherFilesSpaceInformation(
    internalStorageInformation
  )

  const storageSummary = generateStorageSummary(
    entityTypes,
    internalStorageInformation
  )

  return {
    ...otherFilesSpaceInformation,
    ...categoryListItemStorageTexts,
    ...storageSummary,
  }
}

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
import { SEGMENTS_CONFIG_MAP } from "./storage-summary-bar"
import {
  generateFileUploadButtonModalKey,
  generateFileUploadProcessButtonKey,
} from "./file-upload-button"
import {
  getFileManagerLoaderKey,
  getFileManagerStoragePageKey,
} from "./helpers"

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
      text: categoriesSpaceInformation.spaceUsedString,
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
      text: `(${otherFilesSpaceInformation.spaceUsedString})`,
    },
  }
}

const getSegmentBarItemData = (
  entityType: string,
  value: number,
  bytesString: string
) => {
  return {
    value,
    label: `${SEGMENTS_CONFIG_MAP[entityType].label} (${bytesString})`,
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
      const { spaceUsedBytes, spaceUsedString } =
        storageInformation.categoriesSpaceInformation[entityType]

      return getSegmentBarItemData(entityType, spaceUsedBytes, spaceUsedString)
    })

  segments.push(...dynamicSegmentValues)

  const otherFilesSpaceInformation =
    storageInformation.categoriesSpaceInformation["otherFiles"]

  if (otherFilesSpaceInformation !== undefined) {
    const { spaceUsedBytes, spaceUsedString } =
      storageInformation.categoriesSpaceInformation["otherFiles"]

    segments.push(
      getSegmentBarItemData("otherFiles", spaceUsedBytes, spaceUsedString)
    )
  }

  segments.push(
    getSegmentBarItemData(
      "free",
      storageInformation.freeSpaceBytes,
      storageInformation.freeSpaceString
    )
  )

  return {
    [`${key}storageSummaryFreeBytes`]: {
      value: storageInformation.freeSpaceBytes,
    },
    [`${key}storageSummaryUsedText`]: {
      text: `Used: ${storageInformation.usedSpaceString}`,
    },
    [`${key}storageSummaryFreeText`]: {
      text: storageInformation.freeSpaceString,
    },
    [`${key}storageSummaryBar`]: {
      segments,
    },
    ...Object.values(storageInformation.categoriesSpaceInformation).reduce(
      (acc, _, index) => {
        return {
          ...acc,
          [generateFileUploadButtonModalKey(
            `${key}${index}`,
            "FinishedContent"
          )]: {
            freeSpace: storageInformation.freeSpaceBytes,
          },
          [generateFileUploadProcessButtonKey(`${key}${index}`)]: {
            freeSpace: storageInformation.freeSpaceBytes,
          },
        }
      },
      {}
    ),
  }
}

export const generateFileManagerData = (
  data: McFileManagerData,
  config: View,
  feature: string
): Feature["data"] => {
  const entitiesLoaderConfig = config[getFileManagerLoaderKey(feature)].config
  const entityTypes = isEntitiesLoaderConfig(entitiesLoaderConfig)
    ? entitiesLoaderConfig.entityTypes
    : []

  return data.storageInformation.reduce(
    (acc, storageInformation, currentIndex) => {
      const pageKey = getFileManagerStoragePageKey(feature, currentIndex)
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

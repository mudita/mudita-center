/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntitiesLoaderConfig, McFileManagerData } from "generic-view/models"
import { View } from "generic-view/utils"

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
      text: `(${otherFilesSpaceInformation.spaceUsedString})`,
    },
  }
}

export const generateFileManagerData = (
  data: McFileManagerData,
  config: View
) => {
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

  return {
    ...otherFilesSpaceInformation,
    ...categoryListItemStorageTexts,
  }
}

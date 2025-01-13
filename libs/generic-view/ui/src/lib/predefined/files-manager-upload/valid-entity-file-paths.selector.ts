/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const selectValidEntityFilePaths = (
  entitiesData: Record<string, unknown>[]
): string[] => {
  return entitiesData.map((entityData) => {
    if (typeof entityData.filePath === "string") {
      return entityData.filePath
    }
    throw new Error("Invalid entity: filePath is missing or not a string")
  })
}

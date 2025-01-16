/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  areAllFilesDuplicated,
  isFileLargerThan,
  isStorageSpaceSufficientForUpload,
} from "generic-view/utils"
import { ValidationFailure } from "generic-view/store"

export const validateSelectedFiles = async (
  selectedFiles: string[],
  entityFilePaths: string[],
  availableSpace: number
): Promise<ValidationFailure | undefined> => {
  if (selectedFiles.length === 1) {
    const fileLargerThan = await isFileLargerThan(
      selectedFiles[0],
      2000000000 // 2GB
    )
    if (fileLargerThan) return { status: "fileLargerThan2GB" }
  }

  const allFilesDuplicated = areAllFilesDuplicated(
    selectedFiles,
    entityFilePaths
  )

  if (allFilesDuplicated) return { status: "allFilesDuplicated" }

  const { isSufficient, formattedDifference } =
    await isStorageSpaceSufficientForUpload(availableSpace, selectedFiles)
  console.log({ isSufficient, formattedDifference })

  if (!isSufficient) {
    return {
      status: "notHaveSpaceForUpload",
      formattedDifference,
    }
  }

  return undefined
}

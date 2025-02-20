/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  areAllFilesDuplicated,
  isFileLargerThan,
  isStorageSpaceSufficientForUpload,
} from "generic-view/utils"
import { FileTransferValidationError } from "generic-view/store"

export const validateSelectedFiles = async (
  selectedFiles: string[],
  entityFilePaths: string[],
  availableSpace: number,
  destinationPath: string
): Promise<FileTransferValidationError | undefined> => {
  for (const file of selectedFiles) {
    const fileLargerThan = await isFileLargerThan(file, 2000000000) // 2GB
    if (fileLargerThan) {
      return { type: "validation", error: { status: "someFileLargerThan2GB" } }
    }
  }

  const allFilesDuplicated = areAllFilesDuplicated(
    selectedFiles,
    entityFilePaths,
    destinationPath
  )

  if (allFilesDuplicated)
    return { type: "validation", error: { status: "allFilesDuplicated" } }

  const { isSufficient, formattedDifference } =
    await isStorageSpaceSufficientForUpload(availableSpace, selectedFiles)

  if (!isSufficient) {
    return {
      type: "validation",
      error: { status: "notHaveSpaceForUpload", formattedDifference },
    }
  }

  return undefined
}

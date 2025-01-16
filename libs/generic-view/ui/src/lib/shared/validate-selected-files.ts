/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  areAllFilesDuplicated,
  isFileLargerThan,
  isStorageSpaceSufficientForUpload,
} from "generic-view/utils"
import { FileTransferValidationFailure } from "generic-view/store"

export const validateSelectedFiles = async (
  selectedFiles: string[],
  entityFilePaths: string[],
  availableSpace: number
): Promise<FileTransferValidationFailure | undefined> => {
  for (const file of selectedFiles) {
    const fileLargerThan = await isFileLargerThan(file, 2000000000) // 2GB
    if (fileLargerThan) {
      return { status: "someFileLargerThan2GB" }
    }
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

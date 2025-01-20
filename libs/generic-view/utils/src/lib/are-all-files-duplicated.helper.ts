/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"

/**
 * Checks if all file names from the `filesToCheck` list are duplicated
 * (i.e., exist) in the `referenceFiles` list.
 *
 * @param filesToCheck - Array of file paths to verify.
 * @param referenceFiles - Array of file paths used as a reference.
 * @returns `true` if all file names from `filesToCheck` are found in `referenceFiles`.
 */
export const areAllFilesDuplicated = (
  filesToCheck: string[],
  referenceFiles: string[]
): boolean => {
  const fileNamesToCheck = filesToCheck.map((filePath) =>
    path.basename(filePath)
  )
  const referenceFileNames = referenceFiles.map((filePath) =>
    path.basename(filePath)
  )

  return fileNamesToCheck.every((fileName) =>
    referenceFileNames.includes(fileName)
  )
}

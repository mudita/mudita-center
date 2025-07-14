/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  isFileLargerThan,
  isStorageSpaceSufficientForUpload,
} from "generic-view/utils"
import { FileBase, FileTransferValidationError } from "generic-view/store"

export const validateFilesToExport = async (
  filesToExport: FileBase[],
  destinationPath: string
): Promise<FileTransferValidationError | undefined> => {
  for (const file of filesToExport) {
    const fileLargerThan = file.size > 2000000000 // 2GB
    if (fileLargerThan) {
      return { type: "validation", error: { status: "someFileLargerThan2GB" } }
    }
  }

  // const { isSufficient, formattedDifference } =
  //   await isStorageSpaceSufficientForUpload(availableSpace, filesToExport)

  // if (!isSufficient) {
  //   return {
  //     type: "validation",
  //     error: { status: "notHaveSpaceForUpload", formattedDifference },
  //   }
  // }

  return undefined
}

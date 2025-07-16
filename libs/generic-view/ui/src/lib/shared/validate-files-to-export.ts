/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CalculateAndFormatAvailableSpace } from "generic-view/utils"
import { FileBase, FileTransferValidationError } from "generic-view/store"
import checkDiskSpace from "check-disk-space"

export const validateFilesToExport = async (
  filesToExport: FileBase[],
  destinationPath: string
): Promise<FileTransferValidationError | undefined> => {
  let transferredSize = 0
  for (const file of filesToExport) {
    const fileLargerThan = file.size > 2000000000 // 2GB
    if (fileLargerThan) {
      return { type: "validation", error: { status: "someFileLargerThan2GB" } }
    }
    transferredSize += file.size
  }

  const destinationSpaceInfo = await checkDiskSpace(destinationPath)

  const { isSufficient, formattedDifference } =
    CalculateAndFormatAvailableSpace(destinationSpaceInfo.free, transferredSize)

  console.log(
    destinationSpaceInfo,
    transferredSize,
    isSufficient,
    formattedDifference
  )

  if (!isSufficient) {
    return {
      type: "validation",
      error: { status: "notHaveSpaceForUpload", formattedDifference },
    }
  }

  return undefined
}

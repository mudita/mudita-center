/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes } from "app-theme/ui"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import {
  AvailableSpaceInfo,
  FileManagerFile,
  ValidationErrorName,
} from "./manage-files.types"

export const isStorageSpaceSufficientForUpload = (
  freeSpaceBytes: number,
  selectedFiles: FileManagerFile[]
): AvailableSpaceInfo => {
  const totalFileSize = selectedFiles.reduce((acc, file) => acc + file.size, 0)
  return calculateAndFormatAvailableSpace(freeSpaceBytes, totalFileSize)
}

export const calculateAndFormatAvailableSpace = (
  freeSpaceBytes: number,
  totalSpace: number
): AvailableSpaceInfo => {
  const difference = freeSpaceBytes - 1000 - totalSpace
  const isSufficient = difference >= 0

  const formattedDifference = formatBytes(Math.abs(difference), {
    minUnit: "B",
  })

  return { isSufficient, difference, formattedDifference }
}

export const validateSelectedFiles = (
  selectedFiles: FileManagerFile[],
  referenceFiles: FileManagerFile[],
  freeSpaceBytes: number
): AppResult<unknown, ValidationErrorName> => {
  for (const file of selectedFiles) {
    const fileLargerThan = file.size > 2000000000 // 2GB
    if (fileLargerThan) {
      return AppResultFactory.failed(
        new AppError("", ValidationErrorName.SomeFileLargerThan2GB)
      )
    }
  }

  const allFilesDuplicated = selectedFiles.every((selectedFile) =>
    referenceFiles.some((refFile) => refFile.name === selectedFile.name)
  )

  if (allFilesDuplicated) {
    return AppResultFactory.failed(
      new AppError("", ValidationErrorName.AllFilesDuplicated)
    )
  }

  const availableSpaceInfo = isStorageSpaceSufficientForUpload(
    freeSpaceBytes,
    selectedFiles
  )

  if (!availableSpaceInfo.isSufficient) {
    return AppResultFactory.failed(
      new AppError("", ValidationErrorName.NotHaveSpaceForUpload),
      availableSpaceInfo
    )
  }

  return AppResultFactory.success()
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes } from "app-theme/ui"
import {
  AvailableSpaceInfo,
  FileManagerFile,
  FileTransferWithValidation,
  TransferErrorName,
  ValidationSummary,
  ValidationSummaryType,
} from "./manage-files.types"

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
): ValidationSummary => {
  const MAX_SIZE = 2_000_000_000 // 2GB

  const validatedFiles: FileTransferWithValidation[] = []

  let totalValidSize = 0

  let duplicatedCount = 0
  let tooLargeCount = 0

  for (const file of selectedFiles) {
    let validationErrorName: TransferErrorName | undefined

    if (file.size > MAX_SIZE) {
      validationErrorName = TransferErrorName.FileTooLarge
      tooLargeCount++
    } else if (referenceFiles.some((ref) => ref.name === file.name)) {
      validationErrorName = TransferErrorName.Duplicate
      duplicatedCount++
    } else {
      totalValidSize += file.size
    }

    validatedFiles.push({ ...file, validationErrorName })
  }

  const availableSpaceInfo = calculateAndFormatAvailableSpace(
    freeSpaceBytes,
    totalValidSize
  )

  if (!availableSpaceInfo.isSufficient) {
    return {
      type: ValidationSummaryType.NotHaveSpaceForUpload,
      files: validatedFiles,
      values: availableSpaceInfo,
    }
  }

  if (tooLargeCount === selectedFiles.length) {
    return {
      type: ValidationSummaryType.AllFilesTooLarge,
      files: validatedFiles,
    }
  }

  if (duplicatedCount === selectedFiles.length) {
    return {
      type: ValidationSummaryType.AllFilesDuplicated,
      files: validatedFiles,
    }
  }

  if (validatedFiles.some((f) => f.validationErrorName)) {
    return {
      type: ValidationSummaryType.SomeFilesInvalid,
      files: validatedFiles,
    }
  }

  return { type: ValidationSummaryType.AllFilesValid, files: validatedFiles }
}

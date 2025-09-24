/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"
import { AppResult } from "app-utils/models"

export interface FileManagerFileCategory {
  id: string
  icon: IconType
  markerColor: string
  label: string
  fileListEmptyStateDescription: string
  directoryPath: string
  supportedFileTypes: string[]
  size: string
  count: number
}

export type FileManagerFile = {
  id: string
  name: string
  type: string
  size: number
}

export type FileManagerFileMap = Record<string, FileManagerFile>

export type { ManageFilesTableSectionProps } from "./manage-files-content/manage-files-table-section"

export enum TransferErrorName {
  Duplicate = "duplicate",
  NotEnoughMemory = "notEnoughMemory",
  FileTooLarge = "fileTooLarge",
  Cancelled = "cancelled",
  UploadUnknown = "uploadUnknown",
  ExportUnknown = "exportUnknown",
}

export type FileTransferResult = AppResult<
  unknown,
  TransferErrorName,
  Record<string, string | number> | unknown
>

export interface AvailableSpaceInfo {
  isSufficient: boolean
  difference: number
  formattedDifference: string
}

export interface FileFailed extends FileManagerFile {
  label?: string
}

export interface FileTransferWithValidation extends FileManagerFile {
  validationErrorName?: TransferErrorName
}

export enum ValidationSummaryType {
  AllFilesDuplicated = "AllFilesDuplicated",
  NotHaveSpaceForUpload = "NotHaveSpaceForUpload",
  AllFilesTooLarge = "AllFilesTooLarge",
  SomeFilesInvalid = "SomeFilesInvalid",
  AllFilesValid = "AllFilesValid",
}

export type ValidationSummary =
  | {
      type: ValidationSummaryType.AllFilesDuplicated
      files: FileTransferWithValidation[]
    }
  | {
      type: ValidationSummaryType.AllFilesTooLarge
      files: FileTransferWithValidation[]
    }
  | {
      type: ValidationSummaryType.NotHaveSpaceForUpload
      files: FileTransferWithValidation[]
      values: AvailableSpaceInfo
    }
  | {
      type: ValidationSummaryType.SomeFilesInvalid
      files: FileTransferWithValidation[]
    }
  | {
      type: ValidationSummaryType.AllFilesValid
      files: FileTransferWithValidation[]
    }

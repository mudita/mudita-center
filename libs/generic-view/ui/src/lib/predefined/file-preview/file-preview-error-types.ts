/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FilePreviewErrorType {
  UnsupportedFileType = "unsupported-file-type",
  FileNotFound = "file-not-found",
  Unknown = "unknown",
}

export type FilePreviewError = {
  type: FilePreviewErrorType
  details?: string
}

export const isFilePreviewError = (
  error: unknown
): error is FilePreviewError => {
  return (
    typeof error === "object" &&
    "type" in (error as FilePreviewError) &&
    Object.values(FilePreviewErrorType).includes(
      (error as FilePreviewError).type
    )
  )
}

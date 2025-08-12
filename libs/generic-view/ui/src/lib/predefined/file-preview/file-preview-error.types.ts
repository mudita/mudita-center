/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FilePreviewErrorType {
  UnsupportedFileType = "unsupported-file-type",
  UnsupportedTransferType = "unsupported-transfer-type",
  Unknown = "unknown",
}

export type FilePreviewError = {
  type: FilePreviewErrorType
  details?: string
}

export type FilePreviewErrorHandler = (error: FilePreviewError) => void

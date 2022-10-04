/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"

export interface UploadFilesModalProps {
  error: AppError | null
  filesLength: number
  uploading: boolean
  uploadingInfo: boolean
  uploadingFailed: boolean
  onCloseUploadingErrorModal: () => void
}

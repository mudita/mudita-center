/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UploadFilesModalProps {
  filesLength: number
  uploading: boolean
  uploadingInfo: boolean
  uploadingFailed: boolean
  onCloseUploadingErrorModal: () => void
}

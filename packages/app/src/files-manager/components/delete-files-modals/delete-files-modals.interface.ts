/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DeleteFilesModalProps {
  deleting: boolean
  deletingInfo: boolean
  deletingFailed: boolean
  deletingConfirmation: boolean
  filesLength: number
  onCloseDeletingErrorModal: () => void
  onDelete: () => void
  onCloseDeletingConfirmationModal: () => void
}

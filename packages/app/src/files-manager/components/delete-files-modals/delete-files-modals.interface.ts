/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DeleteFilesModalProps {
  filesLength: number
  deleting: boolean
  deletingInfo: boolean
  deletingFailed: boolean
  deletingConfirmation: boolean
  onCloseDeletingErrorModal: () => void
  onDelete: () => void
  onCloseDeletingConfirmationModal: () => void
}

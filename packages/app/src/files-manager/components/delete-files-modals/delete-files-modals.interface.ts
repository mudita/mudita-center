/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DeleteFilesModalProps {
  error: Error | string | null
  deleting: boolean
  deletingInfo: boolean
  deletingConfirmation: boolean
  deletedFilesLength: number
  onCloseDeletingErrorModal: () => void
  onDelete: () => void
  onCloseDeletingModal: () => void
}

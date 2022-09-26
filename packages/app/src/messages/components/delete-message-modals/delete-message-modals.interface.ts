/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DeleteMessageModalProps {
  error: Error | string | null
  deleting: boolean
  deletingConfirmation: boolean
  onCloseDeletingErrorModal: () => void
  onDelete: () => void
  onCloseDeletingModal: () => void
}

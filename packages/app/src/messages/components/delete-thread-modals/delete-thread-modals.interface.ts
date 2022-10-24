/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DeleteThreadModalProps {
  error: Error | string | null
  deleting: boolean
  deletingInfo: boolean
  deletingConfirmation: boolean
  deletedThreads: string[]
  onCloseDeletingErrorModal: () => void
  onDelete: () => void
  onCloseDeletingModal: () => void
}

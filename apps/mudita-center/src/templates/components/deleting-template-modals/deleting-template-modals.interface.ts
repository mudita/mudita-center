/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DeletingTemplateModalsProps {
  deletedTemplatesLength: number
  error: Error | string | null
  deleting: boolean
  deletingInfo: boolean
  deletingConfirmation: boolean
  onCloseDeletingErrorModal: () => void
  onDelete: () => void
  onCloseDeletingModal: () => void
}

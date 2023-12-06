/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "Core/ui"

export interface CheckForUpdateFailedModalProps
  extends Omit<ModalDialogProps, "title" | "className"> {
  open: boolean
  testId?: string
  onContactSupport: () => void
  onTryAgain: () => void
  onClose: () => void
}

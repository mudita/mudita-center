/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "App/ui"

export interface UpdatingFailureWithHelpModalProps
  extends Omit<ModalDialogProps, "title" | "className"> {
  open: boolean
  onClose: () => void
  onContact: () => void
  onHelp: () => void
  testId?: string
}

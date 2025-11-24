/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReactNode } from "react"
import { Messages } from "app-localize/utils"

export interface GenericConfirmModalProps {
  opened: boolean
  onCancel: VoidFunction
  onConfirm: VoidFunction
  itemCount?: number
  confirmDisabled?: boolean
  children?: ReactNode
  messages: {
    confirmModalTitle: Messages
    confirmModalDescription: Messages
    confirmModalConfirmButtonText: Messages
    confirmModalCancelButtonText?: Messages
    confirmModalCheckboxText?: Messages
  }
}

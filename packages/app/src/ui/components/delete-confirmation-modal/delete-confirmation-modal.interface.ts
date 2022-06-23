/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"

export interface DeletingConfirmationsModalProps
  extends ComponentProps<typeof ModalDialog> {
  info?: TranslationMessage
  cancelButtonLabel: string
  actionButtonLabel: string
  titleLabel: string
}

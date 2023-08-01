/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "App/ui/components/modal-dialog"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"

export interface DeletingConfirmationsModalProps extends ModalDialogProps {
  info?: TranslationMessage
  cancelButtonLabel: string
  actionButtonLabel: string
  titleLabel: string
}

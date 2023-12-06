/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "Core/ui/components/modal-dialog"
import { Message as TranslationMessage } from "Core/__deprecated__/renderer/interfaces/message.interface"

export interface DeletingConfirmationsModalProps extends ModalDialogProps {
  info?: TranslationMessage
  cancelButtonLabel: string
  actionButtonLabel: string
  titleLabel: string
}

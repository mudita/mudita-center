/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "App/ui"

export interface UpdateNotAvailableModalProps extends ModalDialogProps {
  version: string
  open: boolean
  onClose: () => void
  testId?: string
}

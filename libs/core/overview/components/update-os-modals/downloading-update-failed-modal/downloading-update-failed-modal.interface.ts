/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "Core/ui"

export interface DownloadingUpdateFailedModalProps
  extends Omit<ModalDialogProps, "title" | "className"> {
  onContactSupport: () => void
  onGoToHelp: () => void
  onClose: () => void
  open: boolean
  testId?: string
}

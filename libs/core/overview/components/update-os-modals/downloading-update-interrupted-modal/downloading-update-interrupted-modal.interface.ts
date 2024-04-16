/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "Core/ui"

interface Release {
  version: string
}

export interface DownloadingUpdateInterruptedModalProps
  extends Omit<ModalDialogProps, "title"> {
  open: boolean
  onClose: () => void
  testId?: string
  alreadyDownloadedReleases: Release[]
}

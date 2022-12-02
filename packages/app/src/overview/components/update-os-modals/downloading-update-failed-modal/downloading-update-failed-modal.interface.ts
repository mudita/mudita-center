/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DownloadingUpdateFailedModalProps {
  onContactSupport: () => void
  onGoToHelp: () => void
  onClose: () => void
  open: boolean
  testId?: string
}

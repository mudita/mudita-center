/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface CheckForUpdateFailedModalProps {
  open: boolean
  testId?: string
  onContactSupport: () => void
  onTryAgain: () => void
  onClose: () => void
}

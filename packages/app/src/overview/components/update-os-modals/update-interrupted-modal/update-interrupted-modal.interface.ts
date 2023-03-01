/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface Release {
  version: string
}

export interface UpdateInterruptedModalProps {
  onClose: () => void
  open: boolean
  testId?: string
  alreadyInstalledReleases: Release[]
}

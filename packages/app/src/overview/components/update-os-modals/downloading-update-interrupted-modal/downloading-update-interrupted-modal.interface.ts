/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface Release {
  version: string
}

export interface DownloadingUpdateInterruptedModalProps {
  open: boolean
  onClose: () => void
  testId?: string
  alreadyDownloadedReleases: Release[]
}

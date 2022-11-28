/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UpdateAvailableModalProps {
  onDownload: () => void
  onClose: () => void
  version: string
  date: string
  open: boolean
  testId?: string
}

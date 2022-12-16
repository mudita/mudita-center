/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DevUpdateModalProps {
  action: () => void
  install: boolean
  version: string
  date: string
  prerelease: boolean
  open: boolean
  onClose: () => void
  testId?: string
}

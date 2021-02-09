/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface SystemProps {
  osVersion: string
  lastUpdate: string
  onUpdateCheck?: () => void
  onUpdate?: () => void
  onDownload?: () => void
  updateAvailable?: boolean
  updateDownloaded?: boolean
}

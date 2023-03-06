/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DownloadingUpdateModalProps {
  open: boolean
  percent: number
  currentlyDownloadingReleaseVersion: string
  currentlyDownloadingReleaseOrder: number
  downloadedReleasesSize: number
  onCancel: () => void
  testId?: string
}

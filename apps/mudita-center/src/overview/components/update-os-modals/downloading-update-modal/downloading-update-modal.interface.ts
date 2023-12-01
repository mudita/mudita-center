/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "App/ui"

export interface DownloadingUpdateModalProps extends ModalDialogProps {
  open: boolean
  percent: number
  currentlyDownloadingReleaseVersion: string
  currentlyDownloadingReleaseOrder: number
  downloadedReleasesSize: number
  onCancel: () => void
  testId?: string
}

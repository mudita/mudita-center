/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AboutUpdatesSectionProps } from "App/overview/components/update-os-modals/update-available-modal/about-updates-section.component"
import { ModalDialogProps } from "App/ui"

export interface UpdateAvailableModalProps extends ModalDialogProps {
  onDownload: () => void
  onClose: () => void
  onUpdate: () => void
  open: boolean
  releases: AboutUpdatesSectionProps["releases"]
  areAllReleasesDownloaded: boolean
  testId?: string
}

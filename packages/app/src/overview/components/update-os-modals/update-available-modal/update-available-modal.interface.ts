/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AboutUpdatesSectionProps } from "App/overview/components/update-os-modals/update-available-modal/about-updates-section.component"

export interface UpdateAvailableModalProps {
  onDownload: () => void
  onClose: () => void
  open: boolean
  releases: AboutUpdatesSectionProps["releases"]
}

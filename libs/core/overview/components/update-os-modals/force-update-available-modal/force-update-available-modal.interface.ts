/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AboutUpdatesSectionProps } from "Core/overview/components/update-os-modals/update-available-modal/about-updates-section.component"
import { ModalDialog } from "Core/ui"
import { ComponentProps } from "react"

export interface ForceUpdateAvailableModalProps
  extends ComponentProps<typeof ModalDialog> {
  onUpdate: () => void
  open: boolean
  releases: AboutUpdatesSectionProps["releases"]
  testId?: string
}

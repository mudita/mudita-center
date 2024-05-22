/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OsRelease } from "Core/update/dto"

export interface UpdateOsInterruptedFlowProps {
  onClose: () => void
  deactivateDevice: () => Promise<void>
  alreadyDownloadedReleases: OsRelease[]
  alreadyInstalledReleases: OsRelease[]
  downloadInterruptedModalOpened: boolean
  updateInterruptedModalOpened: boolean
}

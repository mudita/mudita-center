/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getFilesManager } from "Core/files-manager/selectors/get-files-manager.selector"
import { DeviceDirectory } from "Core/files-manager/constants"

const getDirectoryByActiveSoundAppSelector = createSelector(
  getFilesManager,
  (filesManager): DeviceDirectory | undefined => {
    switch (filesManager.activeSoundApp) {
      case "PURE_MUSIC":
        return DeviceDirectory.Music
      case "HARMONY_RELAXATION":
        return DeviceDirectory.Relaxation
      case "HARMONY_ALARM":
        return DeviceDirectory.Alarm
      case "UNKNOWN":
        return undefined
    }
  }
)

export default getDirectoryByActiveSoundAppSelector

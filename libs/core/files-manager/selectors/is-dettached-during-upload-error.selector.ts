/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getFilesManager } from "Core/files-manager/selectors/get-files-manager.selector"
import { State } from "Core/core/constants"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"

export const isDettachedDuringUploadErrorSelector = createSelector(
  getFilesManager,
  getActiveDevice,
  (filesManager, activeDevice) => {
    return filesManager.uploading === State.Failed && !activeDevice
  }
)

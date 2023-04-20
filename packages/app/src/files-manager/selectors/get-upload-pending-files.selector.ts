/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { createSelector } from "@reduxjs/toolkit"
import { getFilesManager } from "App/files-manager/selectors/get-files-manager.selector"

export const getUploadPendingFiles = createSelector(
  getFilesManager,
  (filesManager) => {
    return filesManager.uploadPendingFiles
  }
)

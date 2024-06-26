/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getFilesManager } from "Core/files-manager/selectors/get-files-manager.selector"

const getFilesSelectedSelector = createSelector(
  getFilesManager,
  (filesManager): string[] => {
    return filesManager.selectedItems.rows
  }
)

export default getFilesSelectedSelector

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import getFilesByActiveSoundAppSelector from "Core/files-manager/selectors/get-files-by-active-sound-app.selector"
import getFilesSelectedSelector from "Core/files-manager/selectors/get-files-selected.selector"

const isAllFilesSelectedSelector = createSelector(
  getFilesSelectedSelector,
  getFilesByActiveSoundAppSelector,
  (filesSelected, files): boolean => {
    return filesSelected.length === files.length
  }
)

export default isAllFilesSelectedSelector

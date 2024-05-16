/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getFilesManager } from "Core/files-manager/selectors/get-files-manager.selector"
import { File } from "Core/files-manager/dto"

const getFilesByActiveSoundAppSelector = createSelector(
  getFilesManager,
  (filesManager): File[] => {
    const files = filesManager.filesMap[filesManager.activeSoundApp]
    return files === undefined ? [] : files
  }
)

export default getFilesByActiveSoundAppSelector

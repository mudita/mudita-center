/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getFilesManager } from "Core/files-manager/selectors/get-files-manager.selector"
import { File } from "Core/files-manager/dto"

const getAllFilesSelector = createSelector(
  getFilesManager,
  (filesManager): File[] => {
    return Object.values(filesManager.filesMap).flatMap(
      (filesArray) => filesArray as File[]
    )
  }
)

export default getAllFilesSelector

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { FileManagerFile } from "../manage-files.types"
import { validateSelectedFiles } from "./validate-selected-files"

interface UseManageFilesValidateArgs {
  existingFiles: FileManagerFile[]
  freeSpaceBytes: number
}

export const useManageFilesValidate = ({
  existingFiles,
  freeSpaceBytes,
}: UseManageFilesValidateArgs) => {
  return useCallback(
    (files: FileManagerFile[]) => {
      return validateSelectedFiles(files, existingFiles, freeSpaceBytes)
    },
    [existingFiles, freeSpaceBytes]
  )
}

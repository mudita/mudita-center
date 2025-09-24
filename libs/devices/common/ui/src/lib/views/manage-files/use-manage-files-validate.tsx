/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useMemo } from "react"
import { validateSelectedFiles } from "./validate-selected-files"
import { FileManagerFile } from "./manage-files.types"

interface UseManageFilesValidateArgs {
  fileMap: Record<string, FileManagerFile>
  freeSpaceBytes: number
}

export const useManageFilesValidate = ({
  fileMap,
  freeSpaceBytes,
}: UseManageFilesValidateArgs) => {
  const existingFiles = useMemo(() => Object.values(fileMap), [fileMap])

  return useCallback(
    (files: FileManagerFile[]) => {
      return validateSelectedFiles(files, existingFiles, freeSpaceBytes)
    },
    [existingFiles, freeSpaceBytes]
  )
}

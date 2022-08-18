/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { File } from "App/files-manager/dto"
import { isFileMatch } from "App/files-manager/helpers/is-file-match.helper"

export interface InitialFilesFilterState {
  files: File[]
  searchValue?: string
}

export interface UseFilesFilterResult {
  searchValue: string
  filteredFiles: File[]
  handleSearchValueChange: (value: string) => void
}

export const useFilesFilter = (
  initialState: InitialFilesFilterState
): UseFilesFilterResult => {
  const files = initialState.files
  const initialSearchValue = initialState.searchValue ?? ""

  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [filteredFiles, setFilteredFiles] = useState<File[]>(files)

  useEffect(() => {
    setFilteredFiles(files.filter((file) => isFileMatch(file, searchValue)))
  }, [searchValue, files])

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value)
  }

  return {
    searchValue,
    filteredFiles,
    handleSearchValueChange,
  }
}

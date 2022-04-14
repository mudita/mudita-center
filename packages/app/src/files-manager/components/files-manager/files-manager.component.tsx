/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  MemorySpace,
} from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import { filesSummaryElements } from "App/files-manager/constants"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"
import { McUsbFile } from "@mudita/pure"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"

interface Props {
  memorySpace?: MemorySpace
  resultState: ResultState
  files: McUsbFile[]
  getFiles: () => void
}

const FilesManager: FunctionComponent<Props> = ({
  memorySpace = {
    free: 0,
    full: 0,
    total: 0,
  },
  resultState,
  files,
  getFiles,
}) => {
  const { free, total } = memorySpace
  const systemMemory = total - free

  const downloadFiles = async () => {
    await getFiles()
  }
  useEffect(() => {
    downloadFiles()
  }, [])

  const diskSpaceCategories: DiskSpaceCategory[] = filesSummaryElements.map(
    (element) => {
      if (element.type === DiskSpaceCategoryType.Free) {
        return {
          ...element,
          size: free,
        }
      }
      if (element.type === DiskSpaceCategoryType.UsedSpace) {
        return {
          ...element,
          size: systemMemory,
        }
      }
      return element
    }
  )

  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <FilesSummary
        diskSpaceCategories={diskSpaceCategories}
        totalMemorySpace={total}
        systemMemory={systemMemory}
      />
      <FilesStorage resultState={ResultState.Empty} files={files} />
    </FilesManagerContainer>
  )
}

export default FilesManager

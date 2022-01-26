/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  MemorySpaceCategory,
} from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import { filesSummaryElements } from "App/files-manager/constants"
import { FileType } from "App/files-manager/constants"
interface Props {
  memorySpace?: MemorySpaceCategory
}

const FilesManager: FunctionComponent<Props> = ({
  memorySpace = {
    free: 0,
    full: 0,
  },
}) => {
  const { full, free } = memorySpace
  const systemMemory = full - free

  const mapperDiskSpaceCategory: DiskSpaceCategory[] = filesSummaryElements.map(
    (element) => {
      if (element.fileType === FileType.Free) {
        return {
          ...element,
          megabyteSize: free,
        }
      }
      if (element.fileType === FileType.UsedSpace) {
        return {
          ...element,
          megabyteSize: systemMemory,
        }
      }
      return element
    }
  )

  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <FilesSummary data={mapperDiskSpaceCategory} memorySpace={memorySpace} />
    </FilesManagerContainer>
  )
}

export default FilesManager

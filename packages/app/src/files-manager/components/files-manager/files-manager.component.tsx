/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"

export interface DiskSpaceCategory {
  filesType: string
  occupiedMemory?: number
  filesAmount?: number
  color: string
  icon: Type
}

export interface MemorySpaceCategory {
  free: number
  full: number
}

interface Props {
  memorySpace: MemorySpaceCategory
}

const FilesManager: FunctionComponent<Props> = ({
  memorySpace = {
    free: 0,
    full: 0,
  },
}) => {
  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <FilesSummary memorySpace={memorySpace} />
    </FilesManagerContainer>
  )
}

export default FilesManager

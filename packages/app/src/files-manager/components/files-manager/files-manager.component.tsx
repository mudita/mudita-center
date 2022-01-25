/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import { MemorySpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"

interface Props {
  memorySpace?: MemorySpaceCategory
}

const FilesManager: FunctionComponent<Props> = ({ memorySpace }) => {
  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <FilesSummary memorySpace={memorySpace} />
    </FilesManagerContainer>
  )
}

export default FilesManager

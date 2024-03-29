/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Col } from "Core/__deprecated__/renderer/components/core/table/table.component"
import { FilesStorageListTypeColTestIds } from "Core/files-manager/components/files-storage-list-type-col/files-storage-list-type-col-test-ids.enum"
import { File } from "Core/files-manager/dto"

interface Props {
  file: File
}

const getTypeContent = (file: File): string => {
  if (file.type === "") {
    return "-"
  } else {
    return file.type.toUpperCase()
  }
}

const FilesStorageListTypeCol: FunctionComponent<Props> = ({ file }) => {
  return (
    <Col data-testid={FilesStorageListTypeColTestIds.Col}>
      {getTypeContent(file)}
    </Col>
  )
}

export default FilesStorageListTypeCol

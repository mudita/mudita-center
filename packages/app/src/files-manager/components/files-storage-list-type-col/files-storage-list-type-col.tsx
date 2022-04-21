/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Col } from "Renderer/components/core/table/table.component"
import { McUsbFile, McUsbFileType } from "@mudita/pure"
import { FilesStorageListTypeColTestIds } from "App/files-manager/components/files-storage-list-type-col/files-storage-list-type-col-test-ids.enum"

interface Props {
  file: McUsbFile
}

// TODO: makes some workaround to handle file type via file name when MTP returns `undefined`
const getTypeContent = (file: McUsbFile): string => {
  if (file.type === McUsbFileType.wav) {
    return "WAV"
  } else if (file.type === McUsbFileType.mp3) {
    return "MP3"
  } else if (file.type === McUsbFileType.flac) {
    return "FLAC"
  } else {
    return "-"
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"
import { McUsbFile } from "@mudita/pure"

interface Props {
  resultState: ResultState
  files: McUsbFile[]
}

const FilesStorage: FunctionComponent<Props> = ({
  resultState,
  files = [],
}) => {
  return (
    <div>
      {(resultState === ResultState.Empty ||
        (resultState === ResultState.Loaded && files.length === 0)) && (
        <p data-testid={FilesStorageTestIds.Empty}>Empty list</p>
      )}
      {resultState === ResultState.Loading && (
        <p data-testid={FilesStorageTestIds.Loading}>Loading...</p>
      )}
      {resultState === ResultState.Loaded && files.length > 0 && (
        <div data-testid={FilesStorageTestIds.Loaded}>
          <p>Files loaded</p>
          {files.map((file) => (
            <p
              key={file.name}
              data-testid={FilesStorageTestIds.Row}
            >{`File name: ${file.name}, size: ${file.size}, type:${file.type}`}</p>
          ))}
        </div>
      )}
      {resultState === ResultState.Error && (
        <p data-testid={FilesStorageTestIds.Error}>Something went wrong...</p>
      )}
    </div>
  )
}

export default FilesStorage

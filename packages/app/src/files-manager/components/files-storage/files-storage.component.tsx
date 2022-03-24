/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  MtpFile,
  ResultState,
} from "App/files-manager/reducers/files-manager.interface"

interface Props {
  resultState: ResultState
  musicFiles: MtpFile[]
}

const FilesStorage: FunctionComponent<Props> = ({
  resultState,
  musicFiles = [],
}) => {
  return (
    <div>
      {resultState === ResultState.Empty && <p>Empty list</p>}
      {resultState === ResultState.Loading && <p>Loading...</p>}
      {resultState === ResultState.Loaded && (
        <div>
          <p>Files loaded</p>
          {musicFiles.map((file) => {
            ;<p>{`File name: ${file.name}, size: ${file.size}, type:${file.type}`}</p>
          })}
        </div>
      )}
      {resultState === ResultState.Error && <p>Something went wrong...</p>}
    </div>
  )
}

export default FilesStorage

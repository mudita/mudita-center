/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"
import { McUsbFile } from "@mudita/pure"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import Text, { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import FilesStorageList from "App/files-manager/components/files-storage-list/files-storage-list.component"

const TitleWrapper = styled.div`
  margin: 1.6rem 3.2rem 1rem;
`

const messages = defineMessages({
  title: {
    id: "component.filesManagerFilesStorageTitle",
  },
})
interface Props {
  resultState: ResultState
  files: McUsbFile[]
}

const FilesStorage: FunctionComponent<Props> = ({
  resultState,
  files = [],
}) => {
  return (
    <>
      <TitleWrapper>
        <Text
          data-testid={FilesStorageTestIds.Title}
          displayStyle={TextDisplayStyle.Headline3}
          message={messages.title}
        />
      </TitleWrapper>
      <FilesStorageList
        data-testid={FilesStorageTestIds.List}
        files={files}
        resultState={resultState}
      />
    </>
  )
}

export default FilesStorage

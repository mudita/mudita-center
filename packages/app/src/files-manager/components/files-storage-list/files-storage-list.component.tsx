/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { FilesStorageListTestIds } from "App/files-manager/components/files-storage-list/files-storage-list-test-ids.enum"
import { McUsbFile } from "@mudita/pure"
import styled from "styled-components"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import Avatar from "Renderer/components/core/avatar/avatar.component"
import { IconType } from "Renderer/components/core/icon/icon-type"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"

const FilesTable = styled(Table)`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8.8rem 1fr 15.2rem 15.2rem auto;
  --columnsGap: 0;
`
const FirstCol = styled(Col)`
  margin-left: 3.2rem;
`
const FileIcon = styled(Avatar)`
  margin-left: 3.2rem;
`

const messages = defineMessages({
  title: {
    id: "component.filesManagerFilesStorageTitle",
  },
  name: {
    id: "component.filesManagerFilesStorageName",
  },
  type: {
    id: "component.filesManagerFilesStorageType",
  },
  size: {
    id: "component.filesManagerFilesStorageSize",
  },
})

interface Props {
  resultState: ResultState
  files: McUsbFile[]
}

const FilesStorageList: FunctionComponent<Props> = ({
  resultState,
  files = [],
  ...rest
}) => {
  return (
    <FilesTable {...rest}>
      {resultState === ResultState.Loaded && files.length > 0 && (
        <>
          <Labels
            size={RowSize.Tiny}
            data-testid={FilesStorageListTestIds.Loaded}
          >
            <FirstCol>{intl.formatMessage(messages.name)}</FirstCol>
            <Col />
            <Col>{intl.formatMessage(messages.type)}</Col>
            <Col>{intl.formatMessage(messages.size)}</Col>
            <Col />
          </Labels>
          {files.map((file, i) => (
            <Row key={i} data-testid={FilesStorageListTestIds.Row}>
              <Col>
                <FileIcon iconType={IconType.MenuMusic} />
              </Col>
              <Col>{file.name}</Col>
              <Col>{file.size}</Col>
              <Col>{file.type}</Col>
              <Col />
            </Row>
          ))}
        </>
      )}
      {(resultState === ResultState.Empty ||
        (resultState === ResultState.Loaded && files.length === 0)) && (
        <p data-testid={FilesStorageListTestIds.Empty}>Empty list</p>
      )}
      {resultState === ResultState.Loading && (
        <p data-testid={FilesStorageListTestIds.Loading}>Loading...</p>
      )}
      {resultState === ResultState.Error && (
        <p data-testid={FilesStorageListTestIds.Error}>
          Something went wrong...
        </p>
      )}
    </FilesTable>
  )
}

export default FilesStorageList

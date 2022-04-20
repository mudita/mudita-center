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
  EmptyState,
  Labels,
  LoadingState,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import Avatar from "Renderer/components/core/avatar/avatar.component"
import { IconType } from "Renderer/components/core/icon/icon-type"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import FilesStorageListTypeCol
  from "App/files-manager/components/files-storage-list-type-col/files-storage-list-type-col"
import { convertBytes } from "Renderer/utils/convert-bytes"

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
const FilesStorageContainer = styled.div`
  height: 100%;
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
  emptyStateTitle: {
    id: "component.filesManagerFilesStorageEmptyStateTitle",
  },
  emptyStateDescription: {
    id: "component.filesManagerFilesStorageEmptyStateDescription",
  },
  errorTitle: {
    id: "component.filesManagerFilesStorageErrorStateTitle",
  },
  errorDescription: {
    id: "component.filesManagerFilesStorageErrorStateDescription",
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
    <FilesStorageContainer {...rest}>
      {resultState === ResultState.Loaded && files.length > 0 && (
        <FilesTable>
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
              <FilesStorageListTypeCol file={file} />
              <Col>{convertBytes(file.size)}</Col>
              <Col />
            </Row>
          ))}
        </FilesTable>
      )}
      {resultState === ResultState.Loading && (
        <LoadingState data-testid={FilesStorageListTestIds.Loading} />
      )}
      {resultState === ResultState.Error && (
        <EmptyState
          title={messages.errorTitle}
          description={messages.errorDescription}
          data-testid={FilesStorageListTestIds.Error}
        />
      )}
      {(resultState === ResultState.Empty ||
        (resultState === ResultState.Loaded && files.length === 0)) && (
        <EmptyState
          data-testid={FilesStorageListTestIds.Empty}
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
        />
      )}
    </FilesStorageContainer>
  )
}

export default FilesStorageList

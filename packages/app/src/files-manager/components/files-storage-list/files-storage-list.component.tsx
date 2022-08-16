/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { FilesStorageListTestIds } from "App/files-manager/components/files-storage-list/files-storage-list-test-ids.enum"
import {
  Col,
  EmptyState,
  Labels,
  LoadingState,
  RowSize,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { State } from "App/core/constants"
import { File } from "App/files-manager/dto"
import FilesStorageListTypeCol from "App/files-manager/components/files-storage-list-type-col/files-storage-list-type-col"
import { convertBytes } from "App/__deprecated__/renderer/utils/convert-bytes"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import useTableScrolling from "App/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import {
  FilesTable,
  FirstCol,
  FileIcon,
  FilesStorageContainer,
  Actions,
  Checkbox,
  FilesListRow,
  FileIconHarmony,
} from "App/files-manager/components/files-storage-list/files-storage-list.styled"
import { DeviceType } from "@mudita/pure"
import { VisibleOnDevice } from "App/ui/components"

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
  deleteAction: {
    id: "component.filesManagerFilesStorageDelete",
  },
})

interface Props {
  state: State
  files: File[]
  toggleRow: (id: string) => void
  selectedItems: string[]
  onDelete: (ids: string[]) => void
}

const FilesStorageList: FunctionComponent<Props> = ({
  state,
  files = [],
  selectedItems,
  toggleRow,
  onDelete,
  ...rest
}) => {
  const { enableScroll, disableScroll } = useTableScrolling()

  return (
    <FilesStorageContainer {...rest}>
      {state === State.Loaded && files.length > 0 && (
        <FilesTable scrollable={false}>
          <Labels
            size={RowSize.Tiny}
            data-testid={FilesStorageListTestIds.Loaded}
          >
            <FirstCol>{intl.formatMessage(messages.name)}</FirstCol>
            <Col />
            <Col>{intl.formatMessage(messages.type)}</Col>
            <Col>{intl.formatMessage(messages.size)}</Col>
            <Col />
            <VisibleOnDevice devices={[DeviceType.MuditaPure]}>
              <Col />
            </VisibleOnDevice>
          </Labels>
          {files.map((file, i) => {
            const selected = selectedItems.includes(file.id)
            const handleCheckboxChange = () => toggleRow(file.id)
            const handleDelete = () => onDelete([file.id])
            return (
              <FilesListRow key={i} data-testid={FilesStorageListTestIds.Row}>
                <Col>
                  <VisibleOnDevice devices={[DeviceType.MuditaPure]}>
                    <Checkbox
                      checked={selected}
                      onChange={handleCheckboxChange}
                      size={Size.Medium}
                      visible={Boolean(selectedItems.length !== 0)}
                    />
                    {selectedItems.length === 0 && (
                      <FileIcon iconType={IconType.MenuMusic} />
                    )}
                  </VisibleOnDevice>
                  <VisibleOnDevice devices={[DeviceType.MuditaHarmony]}>
                    <FileIconHarmony iconType={IconType.MenuMusic} />
                  </VisibleOnDevice>
                </Col>
                <Col>{file.name}</Col>
                <FilesStorageListTypeCol file={file} />
                <Col>{convertBytes(file.size)}</Col>
                <Col />
                <VisibleOnDevice devices={[DeviceType.MuditaPure]}>
                  <Col>
                    <Actions>
                      <Dropdown onOpen={disableScroll} onClose={enableScroll}>
                        <ButtonComponent
                          labelMessage={messages.deleteAction}
                          Icon={IconType.Delete}
                          onClick={handleDelete}
                          iconSize={IconSize.Medium}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                      </Dropdown>
                    </Actions>
                  </Col>
                </VisibleOnDevice>
              </FilesListRow>
            )
          })}
        </FilesTable>
      )}
      {state === State.Loading && (
        <LoadingState data-testid={FilesStorageListTestIds.Loading} />
      )}
      {state === State.Failed && (
        <EmptyState
          title={messages.errorTitle}
          description={messages.errorDescription}
          data-testid={FilesStorageListTestIds.Error}
        />
      )}
      {(state === State.Initial ||
        (state === State.Loaded && files.length === 0)) && (
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

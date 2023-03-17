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
  LoadingState,
  RowSize,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { State } from "App/core/constants"
import { File } from "App/files-manager/dto"
import FilesStorageListTypeCol from "App/files-manager/components/files-storage-list-type-col/files-storage-list-type-col"
import { convertBytes } from "App/core/helpers/convert-bytes/convert-bytes"
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
  FilesListLabels,
  LastEmptyCol,
  TableWrapper,
  Ellipsis,
} from "App/files-manager/components/files-storage-list/files-storage-list.styled"
import { DeviceType } from "App/device/constants"
import { VisibleOnDevice } from "App/ui/components"
import { useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Virtuoso } from "react-virtuoso"
import ElementWithTooltip, {
  ElementWithTooltipPlace,
} from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import {
  TooltipContent,
  TooltipContentType,
} from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/tooltip-content.style"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"

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
  noFoundStateTitle: {
    id: "component.filesManagerFilesStorageNoFoundStateTitle",
  },
  noFoundStateDescription: {
    id: "component.filesManagerFilesStorageNoFoundStateDescription",
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
  noFoundFiles: boolean
  toggleRow: (id: string) => void
  selectedItems: string[]
  onDelete: (ids: string[]) => void
}

const TruncateText: FunctionComponent<{ text: string }> = ({ text }) => (
  <TableWrapper>
    <ElementWithTooltip
      showIfTextEllipsis
      place={ElementWithTooltipPlace.TopRight}
      Element={<Ellipsis>{text}</Ellipsis>}
    >
      <TooltipContent type={TooltipContentType.secondary}>
        <Text
          displayStyle={TextDisplayStyle.Label}
          color="primary"
          element={"p"}
        >
          {text}
        </Text>
      </TooltipContent>
    </ElementWithTooltip>
  </TableWrapper>
)

const FilesStorageList: FunctionComponent<Props> = ({
  state,
  files = [],
  selectedItems,
  toggleRow,
  onDelete,
  noFoundFiles,
  ...rest
}) => {
  const { enableScroll, disableScroll } = useTableScrolling()

  const loadedOrInitialState = state === State.Initial || state === State.Loaded
  const noFoundFilesState = loadedOrInitialState && noFoundFiles
  const noFilesState =
    loadedOrInitialState && files.length === 0 && !noFoundFiles
  const deviceType = useSelector(
    (state: ReduxRootState) => state.device.deviceType
  )
  const filesManagerActionsEnable =
    deviceType === DeviceType.MuditaPure ||
    deviceType === DeviceType.MuditaHarmony

  return (
    <FilesStorageContainer {...rest}>
      {state === State.Loaded && files.length > 0 && (
        <FilesTable scrollable={false}>
          <FilesListLabels
            filesManagerActionsEnabled={filesManagerActionsEnable}
            size={RowSize.Tiny}
            data-testid={FilesStorageListTestIds.Loaded}
          >
            <FirstCol>{intl.formatMessage(messages.name)}</FirstCol>
            <Col />
            <Col>{intl.formatMessage(messages.type)}</Col>
            <Col>{intl.formatMessage(messages.size)}</Col>
            <VisibleOnDevice devices={[DeviceType.MuditaPure, DeviceType.MuditaHarmony]}>
              <LastEmptyCol />
            </VisibleOnDevice>
          </FilesListLabels>
          <Virtuoso
            data={files}
            itemContent={(index, file) => {
              const selected = selectedItems.includes(file.id)
              const handleCheckboxChange = () => toggleRow(file.id)
              const handleDelete = () => onDelete([file.id])
              return (
                <FilesListRow
                  key={index}
                  data-testid={FilesStorageListTestIds.Row}
                >
                  <Col>
                    <VisibleOnDevice devices={[DeviceType.MuditaPure, DeviceType.MuditaHarmony]}>
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
                  </Col>
                  <Col>
                    <TruncateText text={file.name} />
                  </Col>
                  <FilesStorageListTypeCol file={file} />
                  <Col>{convertBytes(file.size)}</Col>
                  <VisibleOnDevice devices={[DeviceType.MuditaPure, DeviceType.MuditaHarmony]}>
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
            }}
          />
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
      {noFilesState && (
        <EmptyState
          data-testid={FilesStorageListTestIds.Empty}
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
        />
      )}
      {noFoundFilesState && (
        <EmptyState
          data-testid={FilesStorageListTestIds.NoFound}
          title={messages.noFoundStateTitle}
          description={messages.noFoundStateDescription}
        />
      )}
    </FilesStorageContainer>
  )
}

export default FilesStorageList

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback } from "react"
import { defineMessages } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { Virtuoso } from "react-virtuoso"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { FilesStorageListTableTestIds } from "Core/files-manager/components/files-storage-list-table/files-storage-list-table-test-ids.enum"
import {
  Col,
  RowSize,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { File } from "Core/files-manager/dto"
import FilesStorageListTypeCol from "Core/files-manager/components/files-storage-list-type-col/files-storage-list-type-col"
import { convertBytes } from "Core/core/helpers/convert-bytes/convert-bytes"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import Dropdown from "Core/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import useTableScrolling from "Core/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { Size } from "Core/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import {
  FilesTable,
  FirstCol,
  FileIcon,
  Actions,
  Checkbox,
  FilesListRow,
  FilesListLabels,
  LastEmptyCol,
  TableWrapper,
  Ellipsis,
} from "Core/files-manager/components/files-storage-list-table/files-storage-list-table.styled"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import ElementWithTooltip, {
  ElementWithTooltipPlace,
} from "Core/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import {
  TooltipContent,
  TooltipContentType,
} from "Core/__deprecated__/renderer/components/core/icon-button-with-tooltip/tooltip-content.style"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { toggleItem } from "Core/files-manager/actions"

const messages = defineMessages({
  name: {
    id: "component.filesManagerFilesStorageName",
  },
  type: {
    id: "component.filesManagerFilesStorageType",
  },
  size: {
    id: "component.filesManagerFilesStorageSize",
  },
  deleteAction: {
    id: "component.filesManagerFilesStorageDelete",
  },
})

interface Props {
  files: File[]
  onDelete: (ids: string[]) => void
  hideCheckbox: boolean
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

const FilesStorageListTable: FunctionComponent<Props> = ({
  files = [],
  onDelete,
  hideCheckbox,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const selectedItems = useSelector(
    (state: ReduxRootState) => state.filesManager.selectedItems.rows
  )

  const { enableScroll, disableScroll } = useTableScrolling()

  const toggleRow = useCallback(
    (id: string) => {
      dispatch(toggleItem(id))
    },
    [dispatch]
  )

  return (
    <FilesTable scrollable={false}>
      <FilesListLabels
        size={RowSize.Tiny}
        data-testid={FilesStorageListTableTestIds.Loaded}
      >
        <FirstCol>{intl.formatMessage(messages.name)}</FirstCol>
        <Col />
        <Col>{intl.formatMessage(messages.type)}</Col>
        <Col>{intl.formatMessage(messages.size)}</Col>
        <LastEmptyCol />
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
              data-testid={FilesStorageListTableTestIds.Row}
              hideCheckbox={hideCheckbox}
            >
              <Col>
                <Checkbox
                  checked={selected}
                  onChange={handleCheckboxChange}
                  size={Size.Medium}
                  visible={Boolean(selectedItems.length !== 0)}
                />
                {selectedItems.length === 0 && (
                  <FileIcon iconType={IconType.EighthNote} />
                )}
              </Col>
              <Col>
                <TruncateText text={file.name} />
              </Col>
              <FilesStorageListTypeCol file={file} />
              <Col>{convertBytes(file.size)}</Col>
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
            </FilesListRow>
          )
        }}
      />
    </FilesTable>
  )
}

export default FilesStorageListTable

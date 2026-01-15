/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import {
  FileManagerFile,
  ManageFilesTableSectionProps,
} from "devices/common/ui"
import {
  ColumnCheckboxCell,
  HeaderCellCheckbox,
  HeaderCellName,
  HeaderCellSize,
  HeaderCellType,
  NameCell,
  SizeCell,
  TypeCell,
} from "./files-table-section-shared"
import { Table } from "app-theme/ui"

export const DeviceManageFilesTableSection: FunctionComponent<
  Pick<ManageFilesTableSectionProps, "onRowClick"> & {
    files: FileManagerFile[]
    nameTooltipText?: string
  }
> = ({ files, onRowClick, nameTooltipText }) => {
  const rowRenderer = useCallback(
    (file: FileManagerFile) => {
      const onClick = onRowClick
        ? () => {
            onRowClick?.(file.id)
          }
        : undefined

      return (
        <Table.Row
          key={file.id}
          onClick={onClick}
          rowSelectorCheckboxDataAttr={"data-row-checkbox"}
        >
          <ColumnCheckboxCell
            id={file.id}
            checkboxDataAttr={"data-row-checkbox"}
          />
          <NameCell file={file} tooltipContent={nameTooltipText} />
          <TypeCell file={file} />
          <SizeCell file={file} />
        </Table.Row>
      )
    },
    [nameTooltipText, onRowClick]
  )

  return (
    <Table
      itemIdField={"id"}
      items={files}
      rowRenderer={rowRenderer}
      header={
        <>
          <HeaderCellCheckbox />
          <HeaderCellName>Name</HeaderCellName>
          <HeaderCellType>Type</HeaderCellType>
          <HeaderCellSize>Size</HeaderCellSize>
        </>
      }
    />
  )
}

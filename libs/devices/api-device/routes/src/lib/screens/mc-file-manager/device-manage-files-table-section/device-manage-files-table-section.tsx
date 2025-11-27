/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { ManageFilesTableSectionProps } from "devices/common/ui"
import { TypographyTransform } from "app-theme/models"
import {
  ColumnCheckboxCell,
  FileListEmptyTable,
  HeaderCellCheckbox,
  HeaderCellName,
  HeaderCellNameText,
  HeaderCellSize,
  HeaderCellSizeText,
  HeaderCellType,
  HeaderCellTypeText,
  NameCell,
  SizeCell,
  TypeCell,
} from "./files-table-section-shared"

export const DeviceManageFilesTableSection: FunctionComponent<
  ManageFilesTableSectionProps
> = ({ fileMap, selectedIds, activeRowId, onSelectedChange }) => {
  return (
    <FileListEmptyTable
      activeRowId={activeRowId}
      dataIds={fileMap ? Object.keys(fileMap) : []}
    >
      <HeaderCellCheckbox></HeaderCellCheckbox>
      <HeaderCellName>
        <HeaderCellNameText textTransform={TypographyTransform.Uppercase}>
          Name
        </HeaderCellNameText>
      </HeaderCellName>
      <HeaderCellType>
        <HeaderCellTypeText textTransform={TypographyTransform.Uppercase}>
          Type
        </HeaderCellTypeText>
      </HeaderCellType>
      <HeaderCellSize>
        <HeaderCellSizeText textTransform={TypographyTransform.Uppercase}>
          Size
        </HeaderCellSizeText>
      </HeaderCellSize>
      <ColumnCheckboxCell
        selectedIds={selectedIds}
        fileMap={fileMap}
        onChange={onSelectedChange}
      />
      <NameCell fileMap={fileMap} />
      <TypeCell fileMap={fileMap} />
      <SizeCell fileMap={fileMap} />
    </FileListEmptyTable>
  )
}

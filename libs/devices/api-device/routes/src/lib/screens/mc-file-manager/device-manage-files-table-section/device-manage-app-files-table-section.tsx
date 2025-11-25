/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { ManageFilesTableSectionProps } from "devices/common/ui"
import { TypographyTransform } from "app-theme/models"
import {
  CellProps,
  ColumnCheckboxCell,
  FileListEmptyTable,
  HeaderCellCheckbox,
  HeaderCellName as BaseHeaderCellName,
  HeaderCellNameText as BaseHeaderCellNameText,
  HeaderCellSize as BaseHeaderCellSize,
  HeaderCellSizeText as BaseHeaderCellSizeText,
  HeaderCellType as BaseHeaderCellType,
  HeaderCellTypeText as BaseHeaderCellTypeText,
  NameCell as BaseNameCell,
  SizeCell as BaseSizeCell,
  TypeCell as BaseTypeCell,
} from "./files-table-section-shared"
import { TableCell, TableHeaderCell, Typography } from "app-theme/ui"
import {
  FileManagerFileMap,
  isAppFileManagerFile,
} from "../device-manage-files.types"

export const DeviceManageAppFilesTableSection: FunctionComponent<
  ManageFilesTableSectionProps<FileManagerFileMap>
> = ({ fileMap, selectedIds, activeRowId, onSelectedChange }) => {
  return (
    <FileListEmptyTable
      activeRowId={activeRowId}
      dataIds={fileMap ? Object.keys(fileMap) : []}
    >
      <HeaderCellCheckbox></HeaderCellCheckbox>
      <HeaderCellName>
        <BaseHeaderCellNameText textTransform={TypographyTransform.Uppercase}>
          Name
        </BaseHeaderCellNameText>
      </HeaderCellName>
      <HeaderCellType>
        <BaseHeaderCellTypeText textTransform={TypographyTransform.Uppercase}>
          Type
        </BaseHeaderCellTypeText>
      </HeaderCellType>
      <HeaderCellSize>
        <BaseHeaderCellSizeText textTransform={TypographyTransform.Uppercase}>
          Size
        </BaseHeaderCellSizeText>
      </HeaderCellSize>
      <HeaderCellStatus>
        <HeaderCellStatusText textTransform={TypographyTransform.Uppercase}>
          Status
        </HeaderCellStatusText>
      </HeaderCellStatus>
      <ColumnCheckboxCell
        selectedIds={selectedIds}
        fileMap={fileMap}
        onChange={onSelectedChange}
      />
      <NameCell fileMap={fileMap} />
      <TypeCell fileMap={fileMap} />
      <SizeCell fileMap={fileMap} />
      <StatusCell fileMap={fileMap} />
    </FileListEmptyTable>
  )
}

const HeaderCellName = styled(BaseHeaderCellName)`
  width: 28.9rem;
`

const HeaderCellType = styled(BaseHeaderCellType)`
  width: 10.4rem;
`

const HeaderCellSize = styled(BaseHeaderCellSize)`
  width: 8.8rem;
`

const HeaderCellStatus = styled(TableHeaderCell)`
  width: 10rem;
  padding: 1.4rem 0 1.2rem 0;
`

export const HeaderCellStatusText = styled(Typography.P5)``

const NameCell = styled(BaseNameCell)`
  width: 28.9rem;
`

const TypeCell = styled(BaseTypeCell)`
  width: 10.4rem;
`

const SizeCell = styled(BaseSizeCell)`
  width: 8.8rem;
`

const StatusCell: FunctionComponent<CellProps> = ({ dataItemId, fileMap }) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  const status = isAppFileManagerFile(file)
    ? file.additionalInfo.installationStatus
    : ""

  console.log("Rendering StatusCell for file:", file, "with status:", status)

  return (
    <ColumnStatus>
      <ColumnStatusText>{status}</ColumnStatusText>
    </ColumnStatus>
  )
}

const ColumnStatus = styled(TableCell)`
  width: 10rem;
`

export const ColumnStatusText = styled(Typography.P1)`
  color: ${({ theme }) => theme.app.color.black};
`

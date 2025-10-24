/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import {
  CheckboxSize,
  TypographyModifier,
  TypographyTransform,
} from "app-theme/models"
import {
  Checkbox,
  Table,
  TableCell,
  TableHeaderCell,
  Tooltip,
  Typography,
} from "app-theme/ui"
import {
  FileManagerFileMap,
  ManageFilesTableSectionProps,
} from "devices/common/ui"

type CellProps = { dataItemId?: string; fileMap: FileManagerFileMap }

const ColumnCheckboxCell: FunctionComponent<
  CellProps & {
    onChange: (fileId: string, checked: boolean) => void
    selectedIds: Set<string>
  }
> = ({ dataItemId, fileMap, onChange, selectedIds }) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnCheckbox>
      <Tooltip placement="bottom-right" offset={{ x: 16, y: 14 }}>
        <Tooltip.Content componentName={"tooltip.content"}>
          <ColumnCheckboxTooltipContentText>
            Select
          </ColumnCheckboxTooltipContentText>
        </Tooltip.Content>
        <Tooltip.Anchor componentName={"tooltip.anchor"}>
          <ColumnCheckboxTooltipAnchorElement
            size={CheckboxSize.Small}
            checked={file ? selectedIds.has(file.id) : false}
            onChange={(e) => file?.id && onChange(file.id, e.target.checked)}
          />
        </Tooltip.Anchor>
      </Tooltip>
    </ColumnCheckbox>
  )
}

const NameCell: FunctionComponent<CellProps> = ({ dataItemId, fileMap }) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnName>
      <ColumnNameText>{file?.name}</ColumnNameText>
    </ColumnName>
  )
}

const TypeCell: FunctionComponent<CellProps> = ({ dataItemId, fileMap }) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnType>
      <ColumnTypeText textTransform={TypographyTransform.Uppercase}>
        {file?.type}
      </ColumnTypeText>
    </ColumnType>
  )
}

const SizeCell: FunctionComponent<CellProps> = ({ dataItemId, fileMap }) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnSize>
      <ColumnSizeText modifier={TypographyModifier.FormatBytes} minUnit={"KB"}>
        {file?.size}
      </ColumnSizeText>
    </ColumnSize>
  )
}

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

const FileListEmptyTable = styled(Table)``

const HeaderCellCheckbox = styled(TableHeaderCell)`
  width: 7.4rem;
  padding: 1.4rem 0 1.2rem 3.2rem;
`

const HeaderCellName = styled(TableHeaderCell)`
  width: 39.4rem;
  padding: 1.4rem 0 1.2rem 0;
`

const HeaderCellNameText = styled(Typography.P5)``

const HeaderCellType = styled(TableHeaderCell)`
  width: 9.4rem;
  padding: 1.4rem 0 1.2rem 0;
`

const HeaderCellTypeText = styled(Typography.P5)``

const HeaderCellSize = styled(TableHeaderCell)`
  width: 8.8rem;
  padding: 1.4rem 0 1.2rem 0;
`

const HeaderCellSizeText = styled(Typography.P5)``

const ColumnCheckbox = styled(TableCell)`
  width: 7.4rem;
  padding: 0 0 0 3.2rem;
`

const ColumnCheckboxTooltipContentText = styled(Typography.P5)`
  color: ${({ theme }) => theme.app.color.grey1};
`

const ColumnCheckboxTooltipAnchorElement = styled(Checkbox)``

const ColumnName = styled(TableCell)`
  width: 39.4rem;
  padding: 0 3.2rem 0 0;
`

const ColumnNameText = styled(Typography.P1)`
  color: ${({ theme }) => theme.app.color.black};
`

const ColumnType = styled(TableCell)`
  width: 9.4rem;
`

const ColumnTypeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

const ColumnSize = styled(TableCell)`
  width: 8.8rem;
`

const ColumnSizeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

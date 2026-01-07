/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
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
import { FileManagerFileMap } from "../device-manage-files.types"

export type CellProps = {
  dataItemId?: string
  fileMap: FileManagerFileMap
  className?: string
  tooltipContent?: string
}

export const ColumnCheckboxCell: FunctionComponent<
  CellProps & {
    onChange: (fileId: string, checked: boolean) => void
    selectedIds: Set<string>
  }
> = ({ dataItemId, fileMap, onChange, selectedIds }) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnCheckbox>
      <Tooltip placement="bottom-right" offset={{ x: 16, y: 14 }}>
        <Tooltip.Content>
          <ColumnCheckboxTooltipContentText>
            Select
          </ColumnCheckboxTooltipContentText>
        </Tooltip.Content>
        <Tooltip.Anchor>
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

export const NameCell: FunctionComponent<CellProps> = ({
  dataItemId,
  fileMap,
  tooltipContent,
  ...props
}) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined

  const content = useMemo(() => {
    if (tooltipContent) {
      return (
        <Tooltip
          placement={"bottom-right"}
          offset={{ x: 9, y: 2 }}
          strategy={"cursor-horizontal"}
        >
          <Tooltip.Content>{tooltipContent}</Tooltip.Content>
          <Tooltip.Anchor>
            <ColumnNameText>{file?.name}</ColumnNameText>
          </Tooltip.Anchor>
        </Tooltip>
      )
    }
    return <ColumnNameText>{file?.name}</ColumnNameText>
  }, [file?.name, tooltipContent])

  return <ColumnName {...props}>{content}</ColumnName>
}

export const TypeCell: FunctionComponent<CellProps> = ({
  dataItemId,
  fileMap,
  ...props
}) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnType {...props}>
      <ColumnTypeText textTransform={TypographyTransform.Uppercase}>
        {file?.type}
      </ColumnTypeText>
    </ColumnType>
  )
}

export const SizeCell: FunctionComponent<CellProps> = ({
  dataItemId,
  fileMap,
  ...props
}) => {
  const file = dataItemId ? fileMap[dataItemId] : undefined
  return (
    <ColumnSize {...props}>
      <ColumnSizeText modifier={TypographyModifier.FormatBytes} minUnit={"KB"}>
        {file?.size}
      </ColumnSizeText>
    </ColumnSize>
  )
}

export const FileListEmptyTable = styled(Table)``

export const HeaderCellCheckbox = styled(TableHeaderCell)`
  width: 7.4rem;
  padding: 1.4rem 0 1.2rem 3.2rem;
`

export const HeaderCellName = styled(TableHeaderCell)`
  width: 39.4rem;
  padding: 1.4rem 0 1.2rem 0;
`

export const HeaderCellNameText = styled(Typography.P5)``

export const HeaderCellType = styled(TableHeaderCell)`
  width: 9.4rem;
  padding: 1.4rem 0 1.2rem 0;
`

export const HeaderCellTypeText = styled(Typography.P5)``

export const HeaderCellSize = styled(TableHeaderCell)`
  width: 8.8rem;
  padding: 1.4rem 0 1.2rem 0;
`

export const HeaderCellSizeText = styled(Typography.P5)``

export const ColumnCheckbox = styled(TableCell)`
  width: 7.4rem;
  padding: 0 0 0 3.2rem;
`

export const ColumnCheckboxTooltipContentText = styled(Typography.P5)`
  color: ${({ theme }) => theme.app.color.grey1};
`

export const ColumnCheckboxTooltipAnchorElement = styled(Checkbox)``

export const ColumnName = styled(TableCell)`
  width: 39.4rem;
  padding: 0 3.2rem 0 0;
`

export const ColumnNameText = styled(Typography.P1)`
  color: ${({ theme }) => theme.app.color.black};
`

export const ColumnType = styled(TableCell)`
  width: 9.4rem;
`

export const ColumnTypeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

export const ColumnSize = styled(TableCell)`
  width: 8.8rem;
`

export const ColumnSizeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

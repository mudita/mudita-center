/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import styled from "styled-components"
import {
  CheckboxSize,
  TypographyModifier,
  TypographyTransform,
} from "app-theme/models"
import { Checkbox, Table, Tooltip, Typography } from "app-theme/ui"
import {
  FileManagerFile,
  ManageFilesFormValues,
  ManageFilesTableSectionProps,
} from "devices/common/ui"
import { useFormContext } from "react-hook-form"

export const HarmonyManageFilesTableSection: FunctionComponent<
  Pick<ManageFilesTableSectionProps, "onRowClick"> & {
    files?: FileManagerFile[]
  }
> = ({ files, onRowClick }) => {
  const rowRenderer = useCallback(
    (file: FileManagerFile) => {
      const onClick = () => {
        onRowClick?.(file.id)
      }
      return (
        <Table.Row
          key={file.id}
          rowSelectorCheckboxDataAttr={"data-row-checkbox"}
          onClick={onClick}
        >
          <ColumnCheckboxCell
            id={file.id}
            checkboxDataAttr={"data-row-checkbox"}
          />
          <NameCell file={file} />
          <TypeCell file={file} />
          <SizeCell file={file} />
        </Table.Row>
      )
    },
    [onRowClick]
  )

  if (!files) {
    return null
  }

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

// Checkbox column
export const ColumnCheckboxCell: FunctionComponent<{
  id: string
  checkboxDataAttr: string
  className?: string
}> = ({ id, checkboxDataAttr, ...rest }) => {
  const { register } = useFormContext<ManageFilesFormValues>()

  return (
    <ColumnCheckbox {...rest}>
      <Tooltip placement={"bottom-right"} offset={{ x: 24, y: 5 }}>
        <Tooltip.Anchor>
          <CustomCheckbox
            {...{
              [checkboxDataAttr]: true,
            }}
            key={id}
            size={CheckboxSize.Small}
            {...register(`selectedFiles.${id}`)}
          />
        </Tooltip.Anchor>
        <Tooltip.Content>Select</Tooltip.Content>
      </Tooltip>
    </ColumnCheckbox>
  )
}

const CustomCheckbox = styled(Checkbox)`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ColumnCheckbox = styled.div`
  width: 7.4rem;
  padding: 0 0 0 2.2rem;
`

const HeaderCellCheckbox = styled(Table.HeaderCell)`
  width: 7.4rem;
`

// Name column
const NameCell: FunctionComponent<{ file: FileManagerFile }> = ({ file }) => {
  return (
    <ColumnName>
      <ColumnNameText>{file.name}</ColumnNameText>
    </ColumnName>
  )
}

const ColumnName = styled.div`
  flex: 1;
  padding: 0 3.2rem 0 0;
`

const HeaderCellName = styled(Table.HeaderCell)`
  flex: 1;
  //padding: 1.4rem 0 1.2rem 0;
`

// Type column
const TypeCell: FunctionComponent<{ file: FileManagerFile }> = ({ file }) => {
  return (
    <ColumnType>
      <ColumnTypeText textTransform={TypographyTransform.Uppercase}>
        {file.type}
      </ColumnTypeText>
    </ColumnType>
  )
}

const ColumnType = styled.div`
  width: 9.4rem;
`

const HeaderCellType = styled(Table.HeaderCell)`
  width: 9.4rem;
  //padding: 1.4rem 0 1.2rem 0;
`

// Size column
const SizeCell: FunctionComponent<{ file: FileManagerFile }> = ({ file }) => {
  return (
    <ColumnSize>
      <ColumnSizeText modifier={TypographyModifier.FormatBytes} minUnit={"KB"}>
        {file.size}
      </ColumnSizeText>
    </ColumnSize>
  )
}

const ColumnSize = styled.div`
  width: 8.8rem;
`

const HeaderCellSize = styled(Table.HeaderCell)`
  width: 8.8rem;
  //padding: 1.4rem 0 1.2rem 0;
`

const ColumnNameText = styled(Typography.P1)`
  color: ${({ theme }) => theme.app.color.black};
`

const ColumnTypeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

const ColumnSizeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

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
import { Checkbox, Table, Tooltip, Typography } from "app-theme/ui"
import { useFormContext } from "react-hook-form"
import { FileManagerFile, ManageFilesFormValues } from "devices/common/ui"

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

export const NameCell: FunctionComponent<{
  file: FileManagerFile
  tooltipContent?: string
  className?: string
}> = ({ file, tooltipContent, ...props }) => {
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
            <ColumnNameText>{file.name}</ColumnNameText>
          </Tooltip.Anchor>
        </Tooltip>
      )
    }
    return <ColumnNameText>{file.name}</ColumnNameText>
  }, [file.name, tooltipContent])

  return <ColumnName {...props}>{content}</ColumnName>
}

export const TypeCell: FunctionComponent<{
  file: FileManagerFile
  className?: string
}> = ({ file, ...props }) => {
  return (
    <ColumnType {...props}>
      <ColumnTypeText textTransform={TypographyTransform.Uppercase}>
        {file.type}
      </ColumnTypeText>
    </ColumnType>
  )
}

export const SizeCell: FunctionComponent<{
  file: FileManagerFile
  className?: string
}> = ({ file, ...props }) => {
  return (
    <ColumnSize {...props}>
      <ColumnSizeText modifier={TypographyModifier.FormatBytes} minUnit={"KB"}>
        {file.size}
      </ColumnSizeText>
    </ColumnSize>
  )
}

// Checkbox column
export const ColumnCheckbox = styled.div`
  width: 7.4rem;
  padding: 0 0 0 2.2rem;
`

export const HeaderCellCheckbox = styled(Table.HeaderCell)`
  width: 7.4rem;
`

const CustomCheckbox = styled(Checkbox)`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

// Name column
export const ColumnName = styled.div`
  flex: 1;
  padding: 0 3.2rem 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderCellName = styled(Table.HeaderCell)`
  flex: 1;
`

const ColumnNameText = styled(Typography.P1).attrs((attrs) => {
  return {
    ...attrs,
    lines: 1,
    title: attrs.children as string,
  }
})`
  color: ${({ theme }) => theme.app.color.black};
  white-space: pre;
`

// Type column
export const ColumnType = styled.div`
  width: 9.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderCellType = styled(Table.HeaderCell)`
  width: 9.4rem;
`

const ColumnTypeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

// Size column
export const ColumnSize = styled.div`
  width: 8.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderCellSize = styled(Table.HeaderCell)`
  width: 8.8rem;
`

const ColumnSizeText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

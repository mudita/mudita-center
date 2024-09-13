/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Children, ReactElement, useCallback, useEffect } from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { TableConfig, TableData } from "generic-view/models"
import { TableCell } from "./table-cell"
import { useFormContext } from "react-hook-form"

export const Table: APIFC<TableData, TableConfig> & {
  Cell: typeof TableCell
} = ({ data, config, children, ...props }) => {
  const formContext = useFormContext()
  const { formOptions } = config || {}
  const { activeIdFieldName } = formOptions || {}

  const activeRowId = activeIdFieldName
    ? formContext.watch(activeIdFieldName)
    : undefined

  const onRowClick = useCallback(
    (id: string) => {
      formContext.setValue(activeIdFieldName!, id)
    },
    [activeIdFieldName, formContext]
  )

  useEffect(() => {
    if (config?.formOptions.totalItemsFieldName) {
      formContext.setValue(config.formOptions.totalItemsFieldName, data?.length)
    }
  }, [config?.formOptions.totalItemsFieldName, data?.length, formContext])

  return (
    <Wrapper {...props}>
      {data?.map((id) => {
        const onClick = () => onRowClick(id)
        return (
          <RowWrapper
            key={id}
            onClick={activeIdFieldName ? onClick : undefined}
            $active={activeRowId === id}
          >
            {Children.map(children, (child) => {
              if (!React.isValidElement(child)) return child
              return React.cloneElement(child as ReactElement, {
                dataItemId: id,
              })
            })}
          </RowWrapper>
        )
      })}
    </Wrapper>
  )
}

Table.Cell = TableCell

// TODO: Add proper styles for the table
const Wrapper = styled.table`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
`

// TODO: Add proper styles for the table row
export const RowWrapper = styled.tr<{ $active?: boolean }>`
  ${({ $active }) =>
    $active &&
    css`
      border-left: 2px solid #000;
    `}
  background-color: ${({ theme }) => theme.color.grey5};
  margin: 1rem 0;
`

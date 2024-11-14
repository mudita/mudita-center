/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { APIFC, useViewFormContext } from "generic-view/utils"
import { TableConfig, TableData } from "generic-view/models"
import { TableCell } from "./table-cell"
import { P1 } from "../texts/paragraphs"
import { difference, intersection } from "lodash"

const rowHeight = 64

export const Table: APIFC<TableData, TableConfig> & {
  Cell: typeof TableCell
} = ({ data = [], config, children, ...props }) => {
  const getFormContext = useViewFormContext()
  const formContext = getFormContext(config.formOptions.formKey)
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  const [visibleRowsBounds, setVisibleRowsBounds] = useState<[number, number]>([
    -1, -1,
  ])

  const { formOptions, columnsNames } = config
  const { activeIdFieldName } = formOptions

  const activeRowId = activeIdFieldName
    ? formContext.watch(activeIdFieldName)
    : undefined

  const onRowClick = useCallback(
    (id: string) => {
      if (!activeIdFieldName) return
      formContext.setValue(activeIdFieldName!, id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIdFieldName]
  )

  const handleScroll = useCallback(() => {
    if (!scrollWrapperRef.current) return
    const { scrollTop, clientHeight } = scrollWrapperRef.current
    if (clientHeight === 0) {
      setTimeout(handleScroll, 10)
      return
    }
    const rowsPerPage = Math.ceil(clientHeight / rowHeight) || 0
    const currentRowIndex = Math.floor(scrollTop / rowHeight)
    const firstVisibleRowIndex = currentRowIndex - rowsPerPage
    const lastVisibleRowIndex = currentRowIndex + rowsPerPage * 2
    setVisibleRowsBounds([firstVisibleRowIndex, lastVisibleRowIndex])
  }, [])

  useEffect(() => {
    if (formOptions.allIdsFieldName) {
      formContext.setValue(formOptions.allIdsFieldName, data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formOptions.allIdsFieldName])

  useEffect(() => {
    if (formOptions.selectedIdsFieldName) {
      const selectedIds = formContext.getValues(
        formOptions.selectedIdsFieldName
      )
      const unavailableIds = difference(selectedIds, data)
      if (unavailableIds.length > 0) {
        formContext.setValue(
          formOptions.selectedIdsFieldName,
          intersection(data, unavailableIds)
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formOptions.selectedIdsFieldName])

  useEffect(() => {
    const scrollWrapper = scrollWrapperRef.current
    if (!scrollWrapper) return

    handleScroll()
    scrollWrapper.addEventListener("scroll", handleScroll)
    return () => {
      scrollWrapper.removeEventListener("scroll", handleScroll)
    }
  }, [data.length, handleScroll])

  const placeholder = useMemo(() => {
    return (
      <RowPlaceholder>
        <td colSpan={Children.count(children)}>
          <div />
        </td>
      </RowPlaceholder>
    )
  }, [children])

  const renderChildren = useCallback(
    (id: string) => {
      return Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child as ReactElement, {
          dataItemId: id,
        })
      })
    },
    [children]
  )

  const renderRow = useCallback(
    (id: string, index: number) => {
      if (index < visibleRowsBounds[0] || index > visibleRowsBounds[1]) {
        return placeholder
      }
      const onClick = () => onRowClick(id)
      const isActive = activeRowId === id

      return (
        <Row onClick={onClick} $active={isActive}>
          {renderChildren(id)}
        </Row>
      )
    },
    [activeRowId, onRowClick, placeholder, renderChildren, visibleRowsBounds]
  )

  return useMemo(
    () => (
      <ScrollableWrapper ref={scrollWrapperRef} {...props}>
        <TableWrapper>
          {columnsNames && columnsNames?.length > 0 && (
            <TableHeader>
              <tr>
                {columnsNames.map((columnName) => (
                  <th key={columnName}>
                    <P1>{columnName}</P1>
                  </th>
                ))}
              </tr>
            </TableHeader>
          )}
          <TableBody>
            {data?.map((id, index) => renderRow(id, index))}
          </TableBody>
        </TableWrapper>
      </ScrollableWrapper>
    ),
    [columnsNames, data, props, renderRow]
  )
}

Table.Cell = TableCell

const ScrollableWrapper = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
`

const TableWrapper = styled.table`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`

const TableHeader = styled.thead`
  background: #fff;
  height: ${rowHeight / 10}rem;
  position: sticky;
  z-index: 2;
  top: 0;

  th {
    text-align: left;
    white-space: nowrap;
  }
`

const TableBody = styled.tbody`
  tr {
    height: ${rowHeight / 10}rem;
  }
  td {
    text-align: left;
  }
`

// TODO: Add proper styles for the table row
const Row = styled.tr<{ $active?: boolean }>`
  height: ${rowHeight / 10}rem;
  border-bottom: solid 0.1rem ${({ theme }) => theme.color.grey5};
  border-left: 0.2rem solid transparent;
  ${({ $active }) =>
    $active &&
    css`
      border-left: 0.2rem solid #000;
    `}
`

const RowPlaceholder = styled.tr`
  height: ${rowHeight / 10}rem;
  border-bottom: solid 0.1rem ${({ theme }) => theme.color.grey5};
`

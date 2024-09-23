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
import { APIFC } from "generic-view/utils"
import { TableConfig, TableData } from "generic-view/models"
import { TableCell } from "./table-cell"
import { useFormContext } from "react-hook-form"
import { P1 } from "../texts/paragraphs"

const rowHeight = 64

export const Table: APIFC<TableData, TableConfig> & {
  Cell: typeof TableCell
} = ({ data = [], config, children, ...props }) => {
  const formContext = useFormContext()
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  const [visibleRowsBounds, setVisibleRowsBounds] = useState<[number, number]>([
    -1, -1,
  ])

  console.log(formContext.watch("selectedContacts"))
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
    [activeIdFieldName, formContext]
  )

  const handleScroll = useCallback(() => {
    if (!scrollWrapperRef.current) return
    const { scrollTop, clientHeight } = scrollWrapperRef.current
    const rowsPerPage = Math.ceil(clientHeight / rowHeight) || 0
    const currentRowIndex = Math.floor(scrollTop / rowHeight)
    const firstVisibleRowIndex = currentRowIndex - rowsPerPage
    const lastVisibleRowIndex = currentRowIndex + rowsPerPage * 2
    setVisibleRowsBounds([firstVisibleRowIndex, lastVisibleRowIndex])
  }, [])

  useEffect(() => {
    if (formOptions.totalItemsFieldName) {
      formContext.setValue(formOptions.totalItemsFieldName, data?.length)
    }
  }, [formOptions.totalItemsFieldName, data?.length, formContext])

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
  width: 100%;
  overflow: auto;
  position: relative;
`

const TableWrapper = styled.table`
  position: absolute;
  top: 0;
  left: 0;
  width: min-content;
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
  ${({ $active }) =>
    $active &&
    css`
      border-left: 0.2rem solid #000;
    `}
  height: ${rowHeight / 10}rem;
`

const RowPlaceholder = styled.tr`
  height: ${rowHeight / 10}rem;

  div {
    display: block;
    height: 2.4rem;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.color.grey6};
  }
`

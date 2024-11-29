/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { difference, intersection } from "lodash"
import { APIFC, useViewFormContext } from "generic-view/utils"
import {
  tableCell,
  TableConfig,
  TableData,
  tableHeaderCell,
} from "generic-view/models"
import { TableCell } from "./table-cell"
import { TableHeaderCell } from "./table-header-cell"
import {
  listItemActiveStyles,
  listItemBaseStyles,
  listItemClickableStyles,
  listItemSelectedStyles,
  listRawItemStyles,
} from "../list/list-item"

const rowHeight = 64

export const Table: APIFC<TableData, TableConfig> & {
  Cell: typeof TableCell
  HeaderCell: typeof TableCell
} = ({ data = [], config, children, ...props }) => {
  const getFormContext = useViewFormContext()
  const formContext = getFormContext(config.formOptions.formKey)
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  const [visibleRowsBounds, setVisibleRowsBounds] = useState<[number, number]>([
    -1, -1,
  ])

  const { formOptions } = config
  const { activeIdFieldName } = formOptions
  const isClickable = Boolean(activeIdFieldName)

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

  const scrollToActiveItem = useCallback(() => {
    const activeElement = scrollWrapperRef.current?.querySelector("tr.active")
    if (activeElement) {
      activeElement.scrollIntoView({
        block: "nearest",
      })
    }
  }, [])

  useEffect(() => {
    if (activeRowId) {
      scrollToActiveItem()
    }
  }, [activeRowId, scrollToActiveItem])

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
    if (
      formOptions.activeIdFieldName &&
      activeRowId &&
      !data.includes(activeRowId)
    ) {
      formContext.setValue(formOptions.activeIdFieldName, undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRowId, data, formOptions.activeIdFieldName])

  useLayoutEffect(() => {
    const scrollWrapper = scrollWrapperRef.current
    if (!scrollWrapper) return

    handleScroll()
    scrollWrapper.addEventListener("scroll", handleScroll)
    return () => {
      scrollWrapper.removeEventListener("scroll", handleScroll)
    }
  }, [data.length, handleScroll])

  const renderPlaceholder = useCallback(
    (id: string) => {
      const isActive = activeRowId === id
      return (
        <RowPlaceholder key={id} className={isActive ? "active" : ""}>
          <td colSpan={Children.count(children)}>
            <div />
          </td>
        </RowPlaceholder>
      )
    },
    [activeRowId, children]
  )

  const renderChildren = useCallback(
    (id: string) => {
      const filteredChildren = React.Children.toArray(children).map((child) => {
        if (
          !React.isValidElement(child) ||
          child.props.componentName !== tableCell.key
        ) {
          return null
        }
        return React.cloneElement(child as ReactElement, {
          dataItemId: id,
        })
      })

      return <>{filteredChildren}</>
    },
    [children]
  )

  const renderHeaderChildren = useCallback(() => {
    const filteredChildren = React.Children.toArray(children).filter(
      (child) => {
        if (!React.isValidElement(child)) return false
        return child.props.componentName === tableHeaderCell.key
      }
    )

    return <>{filteredChildren}</>
  }, [children])

  const renderRow = useCallback(
    (id: string, index: number) => {
      if (index < visibleRowsBounds[0] || index > visibleRowsBounds[1]) {
        return renderPlaceholder(id)
      }
      const onClick = () => onRowClick(id)
      const isActive = activeRowId === id

      return (
        <tr key={id} onClick={onClick} className={isActive ? "active" : ""}>
          {renderChildren(id)}
        </tr>
      )
    },
    [
      activeRowId,
      onRowClick,
      renderChildren,
      renderPlaceholder,
      visibleRowsBounds,
    ]
  )

  return useMemo(
    () => (
      <ScrollableWrapper ref={scrollWrapperRef} {...props}>
        <TableWrapper>
          <TableHeader>
            <tr>{renderHeaderChildren()}</tr>
          </TableHeader>
          <TableBody $clickable={isClickable}>
            {data?.map((id, index) => renderRow(id, index))}
          </TableBody>
        </TableWrapper>
      </ScrollableWrapper>
    ),
    [data, isClickable, props, renderRow, renderHeaderChildren]
  )
}

Table.Cell = TableCell
Table.HeaderCell = TableHeaderCell

const ScrollableWrapper = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
  scroll-behavior: smooth;
`

const TableWrapper = styled.table`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  border-collapse: separate;
  border-spacing: 0;
`

const TableHeader = styled.thead`
  position: sticky;
  z-index: 2;
  top: 0;
  background: #fff;

  th {
    text-align: left;
    white-space: nowrap;
    border-bottom: solid 0.1rem ${({ theme }) => theme.color.grey4};
  }
`

const RowPlaceholder = styled.tr`
  ${listRawItemStyles};
  height: ${rowHeight / 10}rem;
`

const TableBody = styled.tbody<{ $clickable?: boolean }>`
  tr:not(${RowPlaceholder}) {
    ${listItemBaseStyles};
    ${listItemSelectedStyles};
    height: ${rowHeight / 10}rem;

    &.active {
      ${listItemActiveStyles};
    }
    ${({ $clickable }) => $clickable && listItemClickableStyles}
  }
  td {
    text-align: left;
  }
`

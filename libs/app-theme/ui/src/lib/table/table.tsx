/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Children,
  cloneElement,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { noop } from "lodash"
import { TableCell } from "./table-cell"
import { TableHeaderCell } from "./table-header-cell"
import {
  listItemActiveStyles,
  listItemBaseStyles,
  listItemClickableStyles,
  listItemSelectedStyles,
  listRawItemStyles,
} from "../list/list-item"
import { flattenChildren, isDataCell, isHeaderCell } from "./table.helpers"

const ROW_HEIGHT = 64

interface Props extends PropsWithChildren {
  activeRowId?: string
  dataIds: string[]
  data?: Record<string, unknown>
  onRowClick?: (id: string) => void
}

export const Table: FunctionComponent<Props> & {
  Cell: typeof TableCell
  HeaderCell: typeof TableCell
} = ({ children, activeRowId, onRowClick = noop, dataIds, ...props }) => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  const [visibleRowsBounds, setVisibleRowsBounds] = useState<[number, number]>([
    -1, -1,
  ])

  const isClickable = Boolean(activeRowId)

  const handleScroll = useCallback(() => {
    if (!scrollWrapperRef.current) return
    const { scrollTop, clientHeight } = scrollWrapperRef.current
    if (clientHeight === 0) {
      setTimeout(handleScroll, 10)
      return
    }
    const rowsPerPage = Math.ceil(clientHeight / ROW_HEIGHT) || 0
    const currentRowIndex = Math.floor(scrollTop / ROW_HEIGHT)
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

  useLayoutEffect(() => {
    const scrollWrapper = scrollWrapperRef.current
    if (!scrollWrapper) return

    handleScroll()
    scrollWrapper.addEventListener("scroll", handleScroll)
    return () => {
      scrollWrapper.removeEventListener("scroll", handleScroll)
    }
  }, [dataIds.length, handleScroll])

  const renderPlaceholder = useCallback(
    (id: string) => {
      const isActive = activeRowId === id
      return (
        <RowPlaceholder
          key={id}
          data-item-id={id}
          className={isActive ? "active" : ""}
        >
          <td colSpan={Children.count(children)}>
            <div />
          </td>
        </RowPlaceholder>
      )
    },
    [activeRowId, children]
  )

  const headerChildren = useMemo(
    () => flattenChildren(children).filter(isHeaderCell),
    [children]
  )

  const renderChildren = useCallback(
    (id: string) => {
      return flattenChildren(children)
        .filter(isDataCell)
        .map((child) => {
          return cloneElement(child, {
            dataItemId: id,
          })
        })
    },
    [children]
  )

  const renderRow = useCallback(
    (id: string, index: number) => {
      if (index < visibleRowsBounds[0] || index > visibleRowsBounds[1]) {
        return renderPlaceholder(id)
      }
      const onClick = () => onRowClick(id)
      const isActive = activeRowId === id

      return (
        <tr
          key={id}
          data-item-id={id}
          onClick={onClick}
          className={isActive ? "active" : ""}
        >
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
          <TableHeader $hasClickableRows={isClickable}>
            <tr>{headerChildren}</tr>
          </TableHeader>
          <TableBody $clickable={isClickable}>
            {dataIds?.map(renderRow)}
          </TableBody>
        </TableWrapper>
      </ScrollableWrapper>
    ),
    [props, isClickable, headerChildren, dataIds, renderRow]
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
  table-layout: fixed;
`

const TableHeader = styled.thead<{ $hasClickableRows?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;

  tr {
    ${({ $hasClickableRows }) =>
      $hasClickableRows &&
      css`
        &:before {
          content: "";
        }
      `}
  }

  th {
    text-align: left;
    white-space: nowrap;
    border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  }
`

const RowPlaceholder = styled.tr`
  ${listRawItemStyles};
  height: ${ROW_HEIGHT / 10}rem;
`

const TableBody = styled.tbody<{ $clickable?: boolean }>`
  tr:not(${RowPlaceholder}) {
    ${listItemBaseStyles};
    ${listItemSelectedStyles};
    height: ${ROW_HEIGHT / 10}rem;

    &.active {
      ${listItemActiveStyles};
    }
    ${({ $clickable }) => $clickable && listItemClickableStyles}
  }
  td {
    text-align: left;
  }
`

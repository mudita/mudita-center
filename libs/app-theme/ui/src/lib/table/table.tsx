/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  Children,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
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

const rowHeight = 64
type DATA_ID = string
interface Props extends PropsWithChildren {
  activeRowId: string | undefined
  dataIds: DATA_ID[]
  data?: Record<DATA_ID, unknown>
  onRowClick?: (id: string) => void
}

const REACT_ELEMENT = Symbol.for("react.element")
const REACT_TRANSITIONAL_ELEMENT = Symbol.for("react.transitional.element")

function isElementLike(node: any): node is React.ReactElement {
  return (
    !!node &&
    typeof node === "object" &&
    (node.$$typeof === REACT_ELEMENT ||
      node.$$typeof === REACT_TRANSITIONAL_ELEMENT)
  )
}

const isHeaderCell = (el: React.ReactElement) => {
  return (
    (el.type as any).name?.includes("TableHeaderCell") || // storybook
    (el.type as any).displayName?.includes("TableHeaderCell") // react app
  )
}

const isDataCell = (el: React.ReactElement) => !isHeaderCell(el)

function flattenChildren(children: React.ReactNode): React.ReactElement[] {
  const out: React.ReactElement[] = []
  React.Children.forEach(children, (child) => {
    if (!isElementLike(child)) return
    if (child.type === React.Fragment) {
      // @ts-ignore
      out.push(...flattenChildren(child.props.children))
    } else {
      out.push(child)
    }
  })
  return out
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
      console.log(
        id,
        flattenChildren(children)
          .filter(isDataCell)
          .map((child) => {
            return React.cloneElement(child as ReactElement, {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dataItemId: id,
            })
          })
      )
      return flattenChildren(children)
        .filter(isDataCell)
        .map((child) => {
          return React.cloneElement(child as ReactElement, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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
            {dataIds?.map((id, index) => renderRow(id, index))}
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
`

const TableHeader = styled.thead<{ $hasClickableRows?: boolean }>`
  position: sticky;
  z-index: 2;
  top: 0;
  background: #fff;

  tr {
    ${({ $hasClickableRows }) =>
      $hasClickableRows &&
      css`
        &:before {
          content: "";
        }
      `};
  }

  th {
    text-align: left;
    white-space: nowrap;
    border-bottom: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
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

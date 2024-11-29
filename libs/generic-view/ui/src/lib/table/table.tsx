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
import { CheckboxInputWrapper } from "../interactive/form/input/checkbox-input"

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

  useEffect(() => {
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
          <TableBody $clickable={isClickable}>
            {data?.map((id, index) => renderRow(id, index))}
          </TableBody>
        </TableWrapper>
      </ScrollableWrapper>
    ),
    [columnsNames, data, isClickable, props, renderRow]
  )
}

Table.Cell = TableCell

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

const RowPlaceholder = styled.tr`
  height: ${rowHeight / 10}rem;
  border-bottom: solid 0.1rem ${({ theme }) => theme.generic.color.grey5};
`

const TableBody = styled.tbody<{ $clickable?: boolean }>`
  tr:not(${RowPlaceholder}) {
    position: relative;
    height: ${rowHeight / 10}rem;
    border-bottom: solid 0.1rem ${({ theme }) => theme.generic.color.grey5};
    transition: background 0.15s ease-in-out, border 0.15s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.generic.color.grey6};
      border-bottom-color: ${({ theme }) => theme.generic.color.grey4};
    }

    &.active {
      background: ${({ theme }) => theme.generic.color.grey5};
      &:before {
        background: ${({ theme }) => theme.generic.color.grey1};
      }
      &:hover {
        background: ${({ theme }) => theme.generic.color.grey8};
        border-bottom-color: ${({ theme }) => theme.generic.color.grey4};
      }
    }

    ${({ $clickable }) =>
      $clickable &&
      css`
        cursor: pointer;

        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0.5rem;
          height: 100%;
          background: transparent;
          z-index: 1;
          transition: background 0.15s ease-in-out;
        }
      `}

    &:has(${CheckboxInputWrapper} input:checked) {
      background: ${({ theme }) => theme.generic.color.grey5};

      &:hover {
        background: ${({ theme }) => theme.generic.color.grey8};
        border-bottom-color: ${({ theme }) => theme.generic.color.grey4};
      }
    }
  }
  td {
    text-align: left;
  }
`

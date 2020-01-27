import React, { ChangeEvent, Fragment } from "react"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  RowSize,
  rowSizes,
  TableColumn,
  TableData,
  TableGroup,
  TableLabel,
  TableLabels,
  TableRow,
  TableRowLabel,
  TableSidebar,
  TableWrapper,
} from "Renderer/components/core/table-old/table.elements"
import {
  getRowChildren,
  groupRows,
} from "Renderer/components/core/table-old/table.helpers"
import {
  Column,
  GroupedRows,
  Row,
  TableComponentProps,
} from "Renderer/components/core/table-old/table.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import FunctionComponent from "Renderer/types/function-component.interface"

export const TableComponent: FunctionComponent<TableComponentProps> = ({
  className,
  rows,
  columns,
  selectedRows = [],
  onSelect,
  nativeAllSelector = false,
  activeRow,
  onRowActivate,
  sidebarRenderer,
  mainRowsSize = RowSize.Medium,
}) => {
  const selectMode = selectedRows.length > 0
  const activeRowMode = sidebarRenderer && activeRow !== undefined
  const rowsGrouped = rows.some(row => row.hasOwnProperty("_group"))
  const columnsLabeled = columns.some(column => column.hasOwnProperty("label"))
  const visibleColumns = sidebarRenderer
    ? columns.filter(({ permanent }) => permanent || !activeRowMode)
    : columns
  const columnsSizes = visibleColumns.map(({ size }) => size)
  const groupedRows = groupRows(rows, rowsGrouped)
  const groupsLabels = Object.keys(groupedRows)
  const selectedRowsSet = new Set([...selectedRows])

  // Flatten all rows
  const allRowsIds = rows
    .reduce((acc: Row[], row: Row) => {
      return [...acc, ...getRowChildren(row)]
    }, [])
    .map(row => row._uid)

  // All rows are selected
  const fullSelectMode = allRowsIds.length === selectedRows.length

  // Toggle select on all rows
  const toggleAllSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (onSelect) {
      e.target.checked ? onSelect(allRowsIds) : onSelect([])
    }
  }

  // Deactivate any active row
  const closeSidebar = () => {
    if (onRowActivate) {
      onRowActivate(undefined)
    }
  }

  // Recurrent function to render rows with their children
  const rowRenderer = (group: GroupedRows[string], nestLevel: number = 0) => {
    // Calculate group's rows sizes based on default row size and group nest level
    const rowSize = (() => {
      const sizeIndex = rowSizes.indexOf(mainRowsSize) + nestLevel
      return rowSizes[Math.min(sizeIndex, rowSizes.length - 1)]
    })()

    // Iterate through rows groups
    return group.map((row, index) => {
      const { _uid, _children } = row

      // Handle row click action
      const onClickHandler = () => {
        if (onRowActivate && !sidebarRenderer) {
          console.warn(
            `sidebarRenderer prop is empty so no sidebar will be shown`
          )
        }
        if (onRowActivate && !selectMode) {
          return onRowActivate(_uid)
        }
        return undefined
      }

      // Get all nested children of current row
      const allChildren = getRowChildren(row, _uid)

      // Active - true if current row is an active one (eg. presented on sidebar)
      const active = _uid === activeRow

      // Selected - true if current row is selected (eg. checkbox is checked)
      const selected = (() => {
        if (!_children) {
          return selectedRows.includes(_uid)
        }
        return allChildren
          .filter(child => !child._children)
          .every(child => selectedRows.includes(child._uid))
      })()

      // Indeterminate - true if not all children of current row are selected
      const indeterminate =
        !selected &&
        allChildren.some(child => selectedRows.includes(child._uid))

      // Toggle row's selection (and its children)
      const toggleSelection = () => {
        if (!onSelect) {
          console.warn(
            "toggleSelection() cannot be executed as there is no handler passed to onSelect prop"
          )
          return
        }

        if (selected) {
          // Unselect row
          selectedRowsSet.delete(_uid)

          // Unselect all row's children
          if (_children) {
            allChildren.forEach(({ _uid: id }) => selectedRowsSet.delete(id))
          }
        } else {
          // Select only real row, not parent container
          selectedRowsSet.add(_uid)

          // Select all row's children
          if (_children) {
            allChildren.forEach(({ _uid: id }) => selectedRowsSet.add(id))
          }
        }

        // Call onSelect returning array of selected ids of rows
        onSelect(Array.from(selectedRowsSet))

        // If sidebar is active, close it
        closeSidebar()
      }

      // Pass additional props to row's template renderer
      const extendedRow = {
        ...row,
        _active: active,
        _selected: selected,
        _indeterminate: indeterminate,
        _toggleSelection: toggleSelection,
      }
      return (
        <Fragment key={index}>
          <TableRow
            key={_uid}
            columnsSizes={columnsSizes}
            onClick={onRowActivate && !selectMode ? onClickHandler : undefined}
            active={active}
            selected={selected}
            size={rowSize}
            data-testid="row"
          >
            {visibleColumns.map(({ renderTemplate }: Column, columnIndex) => {
              const indent =
                columnIndex < 2
                  ? `calc(${columnsSizes[0]} * ${nestLevel})`
                  : undefined
              return (
                <TableColumn key={columnIndex} indent={indent}>
                  {renderTemplate(extendedRow)}
                </TableColumn>
              )
            })}
          </TableRow>
          {_children && rowRenderer(_children, nestLevel + 1)}
        </Fragment>
      )
    })
  }

  return (
    <TableWrapper
      className={className}
      sidebarOpened={Boolean(sidebarRenderer)}
      colsLabelsAvailable={columnsLabeled}
      rowsLabelsAvailable={rowsGrouped}
    >
      {columnsLabeled && (
        <TableLabels columnsSizes={columnsSizes} data-testid="table-labels">
          {visibleColumns.map(({ label, size }: Column, index) => {
            return (
              <TableLabel key={index} data-testid="column-label">
                {nativeAllSelector && onSelect && index === 0 ? (
                  <InputCheckbox
                    checked={fullSelectMode}
                    indeterminate={!fullSelectMode && selectedRows.length > 0}
                    onChange={toggleAllSelection}
                    data-testid="native-toggle-all"
                  />
                ) : (
                  <Text displayStyle={TextDisplayStyle.SmallFadedText}>
                    {label}
                  </Text>
                )}
              </TableLabel>
            )
          })}
        </TableLabels>
      )}
      <TableData>
        {Boolean(rows.length) ? (
          groupsLabels.map((groupName, groupIndex) => (
            <TableGroup data-testid="table-group" key={groupIndex}>
              {groupName && (
                <TableRowLabel data-testid="row-label">
                  <Text
                    displayStyle={TextDisplayStyle.LargeBoldText}
                    element={"span"}
                  >
                    {groupName}
                  </Text>
                </TableRowLabel>
              )}
              {rowRenderer(groupedRows[groupName])}
            </TableGroup>
          ))
        ) : (
          <p>No data available</p>
        )}
      </TableData>
      {activeRowMode && sidebarRenderer && (
        <TableSidebar
          colsLabelsAvailable={columnsLabeled}
          rowsLabelsAvailable={rowsGrouped}
        >
          {sidebarRenderer({
            ...rows.find(({ _uid }) => _uid === activeRow),
            close: closeSidebar,
          })}
        </TableSidebar>
      )}
    </TableWrapper>
  )
}

export default TableComponent

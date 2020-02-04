import { useReducer } from "react"
import {
  flattenRows,
  getRowChildren,
} from "Renderer/components/core/table/table.helpers"

interface Row {
  [key: string]: any
}

enum ActionType {
  toggleAll,
  toggleRow,
}

interface Action {
  type: ActionType
  payload?: Row
}

const useTableSelect = (rows: Row[]) => {
  const initialState = {
    // A set containing only currently selected rows
    selectedRows: new Set(),

    /*
      A set containing all rows excluding those having children. That's because
      rows with children are needed only for UI purposes (think of them as labels).
      They aren't data per se. That's why they are not selectable. However they
      can imitate (un)selected or indeterminate state depending on select status
      of their children.
    */
    selectableRows: new Set([...flattenRows(rows)]),

    // Flag representing a status when all selectable rows are selected
    allSelected: false,

    // Flag representing a status when no rows are selected
    noneSelected: true,
  }

  const toggleAllHandler = (prevState: typeof initialState) => {
    // If all rows are selected deselect them, otherwise select all
    const tempRows = new Set(
      prevState.allSelected ? [] : Array.from(prevState.selectableRows)
    )

    return {
      ...prevState,
      selectedRows: tempRows,
      allSelected: tempRows.size === prevState.selectableRows.size,
      noneSelected: tempRows.size === 0,
    }
  }

  const toggleRowHandler = (prevState: typeof initialState, payload: Row) => {
    const selectedRowsTemp = new Set(prevState.selectedRows)
    const children = getRowChildren(payload)

    // When row has nested rows
    if (children.length) {
      // check if all children are selected
      if (children.every(row => selectedRowsTemp.has(row))) {
        // and deselect all of them
        children.forEach(row => selectedRowsTemp.delete(row))
      }
      // or if row has zero or not all children selected
      else {
        // select all its children
        children.forEach(row => selectedRowsTemp.add(row))
      }
    }
    // When row doesn't have any nested rows
    else {
      // simply check if it's selected and deselect it, otherwise select it
      selectedRowsTemp.has(payload)
        ? selectedRowsTemp.delete(payload)
        : selectedRowsTemp.add(payload)
    }

    return {
      ...prevState,
      selectedRows: selectedRowsTemp,
      allSelected: selectedRowsTemp.size === prevState.selectableRows.size,
      noneSelected: selectedRowsTemp.size === 0,
    }
  }

  const reducer = (
    prevState = initialState,
    { type, payload = {} }: Action
  ) => {
    switch (type) {
      case ActionType.toggleAll:
        return toggleAllHandler(prevState)
      case ActionType.toggleRow:
        return toggleRowHandler(prevState, payload)
      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Get status of selected and intermediate values of given row
  const getRowStatus = (row: Row) => {
    const status = {
      selected: false,
      indeterminate: false,
    }

    const children = getRowChildren(row)

    // When row has nested rows
    if (children.length) {
      // and all children are selected
      if (children.every(child => state.selectedRows.has(child))) {
        // set parent's status as selected
        status.selected = true
      }
      // or if only some children are selected
      else if (children.some(child => state.selectedRows.has(child))) {
        // set parent's status as indeterminate
        status.indeterminate = true
      }
    }
    // When row doesn't have any nested rows and is selected
    else if (state.selectedRows.has(row)) {
      // set its status as selected
      status.selected = true
    }

    return status
  }

  const toggleAll = () => dispatch({ type: ActionType.toggleAll })

  const toggleRow = (row: Row) =>
    dispatch({ type: ActionType.toggleRow, payload: row })

  return {
    getRowStatus,
    toggleAll,
    toggleRow,
    selectedRows: Array.from(state.selectedRows) as Row[],
    selectableRows: Array.from(state.selectableRows) as Row[],
    allRowsSelected: state.allSelected,
    noneRowsSelected: state.noneSelected,
  }
}

export default useTableSelect

import { useReducer } from "react"
import {
  flattenRows,
  getRowChildren,
} from "Renderer/components/core/table/table.helpers"

interface Row {
  [key: string]: any
}

enum ActionTypes {
  TOGGLE_ALL,
  TOGGLE_ROW,
}

interface Action {
  type: ActionTypes
  payload?: Row
}

const useTableSelect = (rows: Row[]) => {
  const initialState = {
    selectedRows: new Set(),
    availableRows: new Set([...flattenRows(rows)]),
    allChecked: false,
    noneChecked: true,
  }

  const toggleAllHandler = (prevState: typeof initialState) => {
    const tempRows = new Set(
      prevState.allChecked ? [] : Array.from(prevState.availableRows)
    )

    return {
      ...prevState,
      selectedRows: tempRows,
      allChecked: tempRows.size === prevState.availableRows.size,
      noneChecked: tempRows.size === 0,
    }
  }

  const toggleRowHandler = (prevState: typeof initialState, payload: Row) => {
    const tempRows = new Set(prevState.selectedRows)
    const children = getRowChildren(payload)

    if (children.length) {
      if (children.every(row => tempRows.has(row))) {
        children.forEach(row => tempRows.delete(row))
      } else {
        children.forEach(row => tempRows.add(row))
      }
    } else {
      tempRows.has(payload) ? tempRows.delete(payload) : tempRows.add(payload)
    }
    return {
      ...prevState,
      selectedRows: tempRows,
      allChecked: tempRows.size === prevState.availableRows.size,
      noneChecked: tempRows.size === 0,
    }
  }

  const reducer = (
    prevState = initialState,
    { type, payload = {} }: Action
  ) => {
    switch (type) {
      case ActionTypes.TOGGLE_ALL:
        return toggleAllHandler(prevState)
      case ActionTypes.TOGGLE_ROW:
        return toggleRowHandler(prevState, payload)
      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const getRowStatus = (row: Row) => {
    let checked = false
    let indeterminate = false

    const children = getRowChildren(row)

    if (children.length) {
      if (children.every(child => state.selectedRows.has(child))) {
        checked = true
      } else if (children.some(child => state.selectedRows.has(child))) {
        indeterminate = true
      }
    } else if (state.selectedRows.has(row)) {
      checked = true
    }

    return {
      checked,
      indeterminate,
    }
  }

  const toggleAll = () => dispatch({ type: ActionTypes.TOGGLE_ALL })

  const toggleRow = (row: Row) =>
    dispatch({ type: ActionTypes.TOGGLE_ROW, payload: row })

  return {
    getRowStatus,
    toggleAll,
    toggleRow,
    selectedRows: Array.from(state.selectedRows) as Row[],
    availableRows: Array.from(state.availableRows) as Row[],
    allRowsChecked: state.allChecked,
    noneRowsChecked: state.noneChecked,
  }
}

export default useTableSelect

import { useState } from "react"
import { getRowChildren } from "Renderer/components/core/table/table.helpers"

export interface UseTableSelect<T> {
  getRowStatus: (
    row: T
  ) => {
    selected: boolean
    indeterminate: boolean
  }
  toggleAll: () => void
  toggleRow: (row: T) => void
  selectedRows: T[]
  selectableRows: T[]
  resetRows: () => void
  allRowsSelected: boolean
  noneRowsSelected: boolean
}

const useTableSelect = <T, K = T>(
  rows: K[],
  childrenKey = "_children"
): UseTableSelect<T> => {
  const [selectedRows, setSelectedRows] = useState<T[]>([])

  /*
    An array containing all rows excluding those having children. That's because
    rows with children are needed only for UI purposes (think of them as labels).
    They aren't data per se. That's why they are not selectable. However they
    can imitate (un)selected or indeterminate state depending on select status
    of their children.
  */
  const selectableRows = rows.reduce((acc: T[], row: K) => {
    return [
      ...acc,
      ...((row as Record<string, any>)[childrenKey]
        ? ((getRowChildren<K>(row, childrenKey) as unknown) as T[])
        : [(row as unknown) as T]),
    ]
  }, [])

  const allSelected = selectedRows.length === selectableRows.length

  const toggleAll = () => {
    // If all rows are selected deselect them, otherwise select all
    allSelected ? setSelectedRows([]) : setSelectedRows(selectableRows)
  }

  const resetRows = () => setSelectedRows([])

  const toggleRow = (row: T) => {
    const selectedRowsTemp = new Set(selectedRows)
    const children = getRowChildren<T>(row, childrenKey)

    // When row has nested rows
    if (children.length) {
      // check if all children are selected
      if (children.every((child) => selectedRowsTemp.has(child))) {
        // and deselect all of them
        children.forEach((child) => selectedRowsTemp.delete(child))
      }
      // or if row has zero or not all children selected
      else {
        // select all its children
        children.forEach((child) => selectedRowsTemp.add(child))
      }
    }
    // When row doesn't have any nested rows
    else {
      // simply check if it's selected and deselect it, otherwise select it
      selectedRowsTemp.has(row)
        ? selectedRowsTemp.delete(row)
        : selectedRowsTemp.add(row)
    }

    setSelectedRows(Array.from(selectedRowsTemp))
  }

  // Get status of selected and indeterminate values of given row
  const getRowStatus = (row: T) => {
    const status = {
      selected: false,
      indeterminate: false,
    }

    const children = getRowChildren<T>(row, childrenKey)

    // When row has nested rows
    if (children.length) {
      // and all children are selected
      if (children.every((child) => selectedRows.includes(child))) {
        // set parent's status as selected
        status.selected = true
      }
      // or if only some children are selected
      else if (children.some((child) => selectedRows.includes(child))) {
        // set parent's status as indeterminate
        status.indeterminate = true
      }
    }
    // When row doesn't have any nested rows and is selected
    else if (selectedRows.includes(row)) {
      // set its status as selected
      status.selected = true
    }

    return status
  }

  return {
    getRowStatus,
    toggleAll,
    toggleRow,
    selectedRows,
    selectableRows,
    resetRows,
    allRowsSelected: allSelected,
    noneRowsSelected: selectedRows.length === 0,
  }
}

export default useTableSelect

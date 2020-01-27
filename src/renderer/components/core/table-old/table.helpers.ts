import {
  GroupedRows,
  Row,
  TableComponentProps,
  UID,
} from "Renderer/components/core/table-old/table.interface"

// Group rows by _group key
export const groupRows = (
  rows: TableComponentProps["rows"],
  groupsAvailable: boolean = false
) => {
  if (groupsAvailable) {
    return rows.reduce((groups: GroupedRows, item) => {
      const group = item._group as string
      return {
        ...groups,
        [group]: [...(groups[group] || []), item],
      }
    }, {})
  }
  return { "": rows }
}

// Return selected rows with preserving original data structure
export const filterSelectedOnly = (rows: Row[], selectedRowsIds: UID[]) => {
  const copyRows = (row: Row) => Object.assign({}, row)
  const filterRows = (row: Row): boolean => {
    const { _uid, _children } = row
    if (selectedRowsIds.includes(_uid)) {
      return true
    }
    if (_children) {
      return Boolean(
        (row._children = _children.map(copyRows).filter(filterRows)).length
      )
    }
    return false
  }
  return rows.map(copyRows).filter(filterRows)
}

// Recursively get all _children of given row
export const getRowChildren = (
  parent: Row,
  uid?: UID,
  children: Row[] = []
) => {
  if (parent._children) {
    parent._children.forEach(child =>
      getRowChildren(child, undefined, children)
    )
  }
  if (uid !== parent._uid) {
    children.push(parent)
  }
  return children
}

// Convert given row and all its children (_children key) into flat array
export const flattenRows = (rows: Row[]) => {
  return rows.reduce((acc: Row[], row: Row) => {
    return [...acc, ...getRowChildren(row)]
  }, [])
}

interface Row {
  [key: string]: any
}

// Group rows by given key
export const groupRows = (rows: Row[], groupKey: string = "group") => {
  return rows.reduce((groups, item) => {
    const group = item[groupKey].toString()
    return {
      ...groups,
      [group]: [...(groups[group] || []), item],
    }
  }, {})
}

// Recursively get all sub-rows applied to given key
export const getRowChildren = (
  parent: Row,
  childrenKey: string = "_children",
  children: Row[] = [],
  child?: boolean
) => {
  if (parent[childrenKey]) {
    parent[childrenKey].forEach((childRow: any) =>
      getRowChildren(childRow, childrenKey, children, true)
    )
  } else if (child) {
    children.push(parent)
  }
  return children
}

// Convert given row's sub-rows into flat array.
export const flattenRows = (rows: Row[], childrenKey: string = "_children") => {
  return rows.reduce((acc: any[], row: any) => {
    const nextRows = row[childrenKey] ? getRowChildren(row, childrenKey) : [row]
    return [...acc, ...nextRows]
  }, [])
}

// Return only selected rows preserving original rows structure
export const filterSelectedOnly = (
  rows: Row[],
  selectedRows: Row[],
  childrenKey: string = "_children"
) => {
  const copyRows = (row: Row) => Object.assign({}, row)
  const filterRows = (row: Row): boolean => {
    const includesRow = selectedRows.some(
      selectedRow => JSON.stringify(row) === JSON.stringify(selectedRow)
    )
    if (includesRow) {
      return true
    }
    if (row[childrenKey]) {
      return Boolean(
        (row[childrenKey] = row[childrenKey].map(copyRows).filter(filterRows))
          .length
      )
    }
    return false
  }
  return rows.map(copyRows).filter(filterRows)
}

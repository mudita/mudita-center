interface Row {
  [key: string]: any
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

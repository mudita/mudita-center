/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

interface Row {
  [key: string]: any
}

// Recursively get all sub-rows applied to given key
export const getRowChildren = <T extends Row>(
  parent: T,
  childrenKey = "_children",
  children: T[] = [],
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

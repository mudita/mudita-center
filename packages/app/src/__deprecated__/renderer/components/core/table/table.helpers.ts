/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface Row {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// Recursively get all sub-rows applied to given key
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getRowChildren = <T extends Row>(
  parent: T,
  childrenKey = "_children",
  children: T[] = [],
  child?: boolean
) => {
  if (parent[childrenKey]) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    parent[childrenKey].forEach((childRow: any) =>
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      getRowChildren(childRow, childrenKey, children, true)
    )
  } else if (child) {
    children.push(parent)
  }
  return children
}

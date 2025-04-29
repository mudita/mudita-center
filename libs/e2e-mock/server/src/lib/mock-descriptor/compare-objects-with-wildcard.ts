/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const compareObjectsWithWildcard = (
  obj1: Record<string, unknown> | undefined,
  obj2: Record<string, unknown> | undefined
): boolean => {
  if (!obj1 || !obj2) {
    return false
  }

  return Object.keys(obj1).every((key) => {
    if (obj1[key] === "__ANY__") {
      return true
    }
    return JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])
  })
}

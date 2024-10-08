/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { cloneDeep } from "lodash"
import { DataProviderSortConfig, sortDirection, sortOrderingPatterns } from "device/models"
import { stringToRegex } from "./string-to-regex"

export const sortByPriority = (sortConfigs: DataProviderSortConfig) => {
  if (!sortConfigs) return []
  return cloneDeep(sortConfigs).sort((a, b) => a.priority - b.priority)
}

export const compareFields = (
  fieldA: string,
  fieldB: string,
  direction: sortDirection
) => {
  return direction === "asc"
    ? fieldA.localeCompare(fieldB)
    : fieldB.localeCompare(fieldA)
}

export const compareWithOrderingPatterns = (
  fieldA: string,
  fieldB: string,
  patterns: sortOrderingPatterns,
  direction: sortDirection
) => {
  const directionMultiplier = direction === "asc" ? 1 : -1

  for (const pattern of patterns) {
    const regex = stringToRegex(pattern)
    const matchA = regex.test(fieldA)
    const matchB = regex.test(fieldB)

    if (matchA && !matchB) return -1 * directionMultiplier
    if (!matchA && matchB) return 1 * directionMultiplier
  }
  return 0
}

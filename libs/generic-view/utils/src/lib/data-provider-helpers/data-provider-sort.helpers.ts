/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { cloneDeep, get } from "lodash"
import {
  DataProviderSortConfig,
  sortDirection,
  sortOrderingPatterns,
  sortSensitivity,
} from "device/models"
import { stringToRegex } from "./string-to-regex"

export const sortByPriority = (sortConfigs: DataProviderSortConfig) => {
  if (!sortConfigs) return []
  return cloneDeep(sortConfigs).sort((a, b) => a.priority - b.priority)
}

export const compareFields = (
  fieldA: string,
  fieldB: string,
  direction: sortDirection,
  sensitivity: sortSensitivity
) => {
  const comparison = fieldA.localeCompare(fieldB, undefined, { sensitivity })
  return direction === "asc" ? comparison : -comparison
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

export const getFirstNonEmptyField = (
  obj: unknown,
  fields: string[]
): unknown => {
  const fieldKey =
    fields.find(
      (field) => get(obj, field) && (get(obj, field) as string).trim() !== ""
    ) ?? ""
  return get(obj, fieldKey)
}

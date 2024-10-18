/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { cloneDeep, get } from "lodash"
import {
  DataSortConfig,
  SortDirection,
  SortOrderingPatterns,
  SortSensitivity,
} from "device/models"
import { stringToRegex } from "../data-provider-helpers/string-to-regex"

export const sortByPriority = (sortConfigs: DataSortConfig) => {
  if (!sortConfigs) return []
  return cloneDeep(sortConfigs).sort((a, b) => a.priority - b.priority)
}

export const compareFields = (
  fieldA: string | number,
  fieldB: string | number,
  direction: SortDirection,
  sensitivity: SortSensitivity
) => {
  if (typeof fieldA === "number" && typeof fieldB === "number") {
    return direction === "asc" ? fieldA - fieldB : fieldB - fieldA
  }

  if (typeof fieldA === "string" && typeof fieldB === "string") {
    const comparison = fieldA.localeCompare(fieldB, undefined, { sensitivity })
    return direction === "asc" ? comparison : -comparison
  }

  if (typeof fieldA === "string" && typeof fieldB === "number") {
    return direction === "asc" ? -1 : 1
  }

  if (typeof fieldA === "number" && typeof fieldB === "string") {
    return direction === "asc" ? 1 : -1
  }

  return 0
}

export const compareWithOrderingPatterns = (
  fieldA: string | number,
  fieldB: string | number,
  patterns: SortOrderingPatterns,
  direction: SortDirection
) => {
  const directionMultiplier = direction === "asc" ? 1 : -1

  for (const pattern of patterns) {
    const regex = stringToRegex(pattern)
    const matchA = regex.test(String(fieldA))
    const matchB = regex.test(String(fieldB))

    if (matchA && !matchB) return -1 * directionMultiplier
    if (!matchA && matchB) return 1 * directionMultiplier
  }
  return 0
}

export const getFirstNonEmptyField = (
  obj: unknown,
  fields: string[]
): unknown => {
  const fieldKey = fields.find((field) => {
    const value = get(obj, field)

    if (value === null || value === undefined) {
      return false
    }

    if (typeof value === "string" && value.trim() === "") {
      return false
    }

    if (typeof value === "number" && isNaN(value)) {
      return false
    }

    return true
  })

  return fieldKey ? get(obj, fieldKey) : ""
}

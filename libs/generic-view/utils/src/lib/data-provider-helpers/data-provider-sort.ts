/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderSortConfig } from "device/models"
import { stringToRegex } from "./string-to-regex"

export const dataProviderSort = (
  data: Record<string, unknown>[] = [],
  sort?: DataProviderSortConfig
) => {
  if (!sort || !data) return data
  const fieldsSortedByPriority = Object.entries(sort)
    .sort((a, b) => a[1].priority - b[1].priority)
    .map(([key, { direction, orderingPatterns }]) => ({
      key,
      direction,
      orderingPatterns,
    }))

  return data.sort((a, b) => {
    let score = 0
    for (const {
      key,
      direction,
      orderingPatterns = [],
    } of fieldsSortedByPriority) {
      if (!(key in a) || !(key in b)) {
        continue
      }
      const fieldA = a[key] as string
      const fieldB = b[key] as string

      for (let i = 0; i < orderingPatterns.length; i++) {
        const regex = stringToRegex(orderingPatterns[i])
        const matchA = regex.test(fieldA)
        const matchB = regex.test(fieldB)

        if (matchA && !matchB) {
          score = -1
          break
        }
        if (!matchA && matchB) {
          score = 1
          break
        }
      }
      if (score === 0) {
        score =
          direction === "asc"
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA)
        if (score !== 0) {
          break
        }
      }
    }
    return score
  })
}

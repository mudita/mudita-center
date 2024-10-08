/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderSortConfig } from "device/models"
import { stringToRegex } from "./string-to-regex"
import { cloneDeep, get } from "lodash"

export const dataProviderSort = (
  data: Record<string, unknown>[] = [],
  sort?: DataProviderSortConfig
) => {
  if (!sort || !data) return data
  const fieldsSortedByPriority = cloneDeep(sort).sort(
    (a, b) => a.priority - b.priority
  )

  return data.sort((a, b) => {
    let score = 0
    for (const {
      providerField,
      direction,
      orderingPatterns = [],
    } of fieldsSortedByPriority) {
      const fieldA = get(a, providerField) as string
      const fieldB = get(b, providerField) as string
      if (!fieldA || !fieldB) {
        continue
      }

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

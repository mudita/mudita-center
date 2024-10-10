/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderSortConfig } from "device/models"
import isEmpty from "lodash/isEmpty"
import {
  compareFields,
  compareWithOrderingPatterns,
  getFirstNonEmptyField,
  sortByPriority,
} from "./data-provider-sort.helpers"

export const dataProviderSort = (
  data: Record<string, unknown>[] = [],
  configs?: DataProviderSortConfig
) => {
  if (!configs || !data) return data

  const sortedConfigs = sortByPriority(configs)

  return data.sort((a, b) => {
    for (const {
      providerField,
      providerGroup,
      direction,
      orderingPatterns = [],
      sensitivity = "variant",
      emptyOrder = "last",
    } of sortedConfigs) {
      const fields = providerField ? [providerField] : providerGroup
      if (!fields) continue
      let index = 0

      while (index < fields.length) {
        const remainingFields = fields.slice(index)
        const fieldA = getFirstNonEmptyField(a, remainingFields)
        const fieldB = getFirstNonEmptyField(b, remainingFields)

        if (fieldA === fieldB) {
          index++
          continue
        }

        if (isEmpty(fieldA) && !isEmpty(fieldB)) {
          return emptyOrder === "first" ? -1 : 1
        } else if (!isEmpty(fieldA) && isEmpty(fieldB)) {
          return emptyOrder === "first" ? 1 : -1
        }

        if (
          (typeof fieldA !== "string" && typeof fieldA !== "number") ||
          (typeof fieldB !== "string" && typeof fieldB !== "number")
        ) {
          index++
          continue
        }

        const regexComparison = compareWithOrderingPatterns(
          fieldA,
          fieldB,
          orderingPatterns,
          direction
        )
        if (regexComparison !== 0) {
          return regexComparison
        }

        const fieldComparison = compareFields(
          fieldA,
          fieldB,
          direction,
          sensitivity
        )
        if (fieldComparison !== 0) {
          return fieldComparison
        } else {
          index++
        }
      }
    }

    return 0
  })
}

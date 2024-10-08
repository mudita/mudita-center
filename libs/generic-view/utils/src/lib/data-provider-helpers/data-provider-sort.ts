/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderSortConfig } from "device/models"
import get from "lodash/get"
import isEmpty from "lodash/isEmpty"
import {
  compareFields,
  compareWithOrderingPatterns,
  sortByPriority,
} from "./data-provider-sort.helpers"
export const dataProviderSort = (
  data: Record<string, unknown>[] = [],
  sortConfigs?: DataProviderSortConfig
) => {
  if (!sortConfigs || !data) return data

  const sortedConfigs = sortByPriority(sortConfigs)

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

      for (const field of fields) {
        const fieldA = get(a, field)
        const fieldB = get(b, field)

        if (isEmpty(fieldA) && !isEmpty(fieldB)) {
          return emptyOrder === "first" ? -1 : 1
        } else if (!isEmpty(fieldA) && isEmpty(fieldB)) {
          return emptyOrder === "first" ? 1 : -1
        }

        if (typeof fieldA !== "string" || typeof fieldB !== "string") {
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
        }
      }
    }
    return 0
  })
}

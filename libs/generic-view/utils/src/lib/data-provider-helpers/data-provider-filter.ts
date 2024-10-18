/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderFiltersConfig } from "device/models"
import { stringToRegex } from "./string-to-regex"
import { cloneDeep, get } from "lodash"

export const dataProviderFilter = (
  data: Record<string, unknown>[] = [],
  filters?: DataProviderFiltersConfig
) => {
  if (!filters || !data) return data

  return data.filter((item) => {
    return cloneDeep(filters).every(({ providerField, patterns }) => {
      const field = get(item, providerField) as string
      return patterns.every((pattern) => {
        const regex = stringToRegex(pattern)
        return regex.test(field || "")
      })
    })
  })
}

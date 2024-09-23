/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderFilterConfig } from "device/models"
import { stringToRegex } from "./string-to-regex"
import { get } from "lodash"

export const dataProviderFilter = (
  data: Record<string, unknown>[] = [],
  filters?: DataProviderFilterConfig
) => {
  if (!filters || !data) return data

  return data.filter((item) => {
    return Object.entries(filters).every(([key, patterns]) => {
      const field = get(item, key) as string
      return patterns.every((pattern) => {
        const regex = stringToRegex(pattern)
        return regex.test(field || "")
      })
    })
  })
}

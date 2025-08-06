/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// eslint-disable-next-line @nx/enforce-module-boundaries
import { color } from "../../../../utils/src/lib/app-theme/color"

export const colorsList = Object.entries(color).flatMap(([name, value]) => {
  if (typeof value === "object") {
    return Object.entries(value)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => {
        return {
          name: `${name}.${key}`,
          value: value as string,
        }
      })
  }
  return {
    name,
    value,
  }
})

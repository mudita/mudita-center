/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PrimitiveValue } from "./layout.types"

export const mapSizes = (sizes: PrimitiveValue[]) => {
  return sizes
    .map((size) => {
      if (typeof size === "number") {
        return `${size}fr`
      }
      return size
    })
    .join(" ")
}

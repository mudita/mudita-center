/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PrimitiveValue } from "../models/layout.types"

export const mapLayoutSizes = (sizes: PrimitiveValue[]) => {
  return sizes
    .map((size) => {
      if (typeof size === "number" || !Number.isNaN(Number(size))) {
        return `${size}fr`
      }
      return size
    })
    .join(" ")
}

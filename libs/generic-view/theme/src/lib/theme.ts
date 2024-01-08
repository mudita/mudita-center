/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { color } from "./color"
import { fontSize } from "./font-size"
import { radius } from "./radius"
import { space } from "./space"
import { lineHeight } from "./line-height"

export const theme = {
  color,
  radius,
  space,
  fontSize,
  lineHeight,
} as const

export type Theme = typeof theme

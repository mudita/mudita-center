/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { color } from "./color"
import { radius } from "./radius"
import { space } from "./space"
import { fontSize } from "./font-size"
import { lineHeight } from "./line-height"
import { fontWeight } from "./font-weight"
import {
  buttonTransitionDuration,
  buttonTransitionEasing,
  modalTransitionDuration,
} from "./constants"

export const appTheme = {
  color,
  radius,
  space,
  fontSize,
  lineHeight,
  fontWeight,
  constants: {
    modalTransitionDuration,
    buttonTransitionDuration,
    buttonTransitionEasing,
  },
} as const

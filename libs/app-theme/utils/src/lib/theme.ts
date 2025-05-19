/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { appTheme } from "./app-theme"
import { legacyTheme } from "./legacy-theme"

export type {AppColor } from "./app-theme/color"

export const theme = {
  app: appTheme,
  legacy: legacyTheme,
} as const

export type Theme = typeof theme

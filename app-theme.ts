/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import theme from "Core/core/styles/theming/theme"
import { theme as genericTheme } from "Root/libs/generic-view/theme/src/lib/theme"

export const appTheme = {
  core: theme,
  generic: genericTheme,
}

export type AppTheme = typeof appTheme

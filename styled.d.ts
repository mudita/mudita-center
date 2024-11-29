/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "styled-components"
import { AppTheme } from "./app-theme"

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}

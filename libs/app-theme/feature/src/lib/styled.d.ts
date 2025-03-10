/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "styled-components"
import { Theme } from "./theme"

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}

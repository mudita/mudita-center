/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "styled-components"
import { Theme } from "generic-view/theme"

type CustomTheme = Theme

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}

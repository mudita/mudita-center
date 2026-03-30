/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "styled-components"
import { Theme } from "./theme"
import { CSSProperties as StyledCSSProperties } from "styled-components"

declare module "styled-components" {
  interface DefaultTheme extends Theme {}

  export type CSSProperties = StyledCSSProperties & {
    [key: `--${string}`]: string | number | undefined
  }
}

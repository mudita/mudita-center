/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./theme"
import { GlobalStyle } from "./global-style"

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

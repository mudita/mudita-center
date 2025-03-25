/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { StyleSheetManager, ThemeProvider } from "styled-components"
import { IStyleSheetManager } from "styled-components/dist/models/StyleSheetManager"
import isPropValid from "@emotion/is-prop-valid"
import { Normalize } from "styled-normalize"
import { theme } from "./theme"
import { GlobalStyle } from "./global-style"

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Normalize />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}

type ShouldForwardProp = IStyleSheetManager["shouldForwardProp"]

const shouldForwardProp: ShouldForwardProp = (prop, target) => {
  if (typeof target === "string") {
    return isPropValid(prop)
  }
  return true
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled, { StyleSheetManager, ThemeProvider } from "styled-components"
import { IStyleSheetManager } from "styled-components/dist/models/StyleSheetManager"
import isPropValid from "@emotion/is-prop-valid"
import { Normalize } from "styled-normalize"
import { GlobalStyle } from "./global-style"
import { theme } from "app-theme/utils"

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Normalize />
        {children}
        <TooltipPortalContainer id={"tooltip-portal"} />
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

const TooltipPortalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  pointer-events: none;
`

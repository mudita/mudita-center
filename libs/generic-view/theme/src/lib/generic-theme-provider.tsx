/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, PropsWithChildren } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { Theme, theme } from "./theme"

export const GenericThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    box-sizing: border-box;
  }

  .generic-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.black + "4D"};
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 400ms ease-out;

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  .generic-modal {
    background-color: ${({ theme }) => theme.color.white};
    border-radius: ${({ theme }) => theme.radius.sm};
    width: 100%;
    max-height: calc(100vh - 20rem);
    overflow: hidden;
    box-shadow: 0 2rem 10rem 0 ${({ theme }) => theme.color.black + "26"};
    display: flex;
    flex-direction: column;
  }
`

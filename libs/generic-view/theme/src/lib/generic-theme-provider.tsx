/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, PropsWithChildren } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { AppTheme, appTheme } from "Root/app-theme"

export const GenericThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyle />
      <div className="box-sizing-wrapper">{children}</div>
    </ThemeProvider>
  )
}

export const modalTransitionDuration = 400

export const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
  .box-sizing-wrapper {
    height: 100%;
    & > * {
      height: 100%;
    }
  }
  .box-sizing-wrapper * {
    box-sizing: border-box;
  }

  .generic-modal-overlay {
    --modal-transition-duration: ${modalTransitionDuration}ms;
    --modal-transition-timing-function: ease-out;
    --modal-opacity: 1;
    --modal-visibility: visible;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.generic.color.black + "4D"};
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--modal-transition-duration) var(--modal-transition-timing-function);

    &.hidden {
      background-color: transparent;
    }

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  .generic-modal  {
    box-sizing: border-box;

    width: auto;
    max-height: var(--modal-max-height);
    overflow: hidden;
    outline: none;
    display: flex;
    flex-direction: column;
    position: relative;

    .modal-content {
      background-color: ${({ theme }) => theme.generic.color.white};
      border-radius: ${({ theme }) => theme.generic.radius.sm};
      overflow: hidden;
      box-shadow: 0 2rem 10rem 0 ${({ theme }) =>
        theme.generic.color.black + "26"};
    }

    .modal-close-icon-button:nth-child(2) {
      display: none;
    }
    * {
      box-sizing: border-box;
    }
  }

  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.generic.color.grey2};
    border-radius: 0.25rem;
  }
`

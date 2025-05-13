/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    interpolate-size: allow-keywords;
  }

  html {
    background-color: ${({ theme }) => theme.app.color.grey6};
    font-family: GT Pressura, Roboto Condensed, sans-serif;
    /* stylelint-disable unit-allowed-list */
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  #root > * {
    height: 100%;
  }

  body * {
    box-sizing: border-box;
  }


  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.app.color.grey2};
    border-radius: 0.25rem;
  }

  .__react_component_tooltip {
    pointer-events: auto !important;

    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }

    &.show {
      opacity: 1 !important;
      padding: 0 !important;
    }

    &.place-bottom {
      margin-top: -0px !important;
    }

    &.place-top {
      margin-top: -0px !important;
    }
  }
`

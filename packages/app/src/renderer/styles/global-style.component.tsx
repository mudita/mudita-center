/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  font,
  width,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { createGlobalStyle } from "styled-components"
import { Theme } from "./theming/theme"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body  {
    background-color: ${backgroundColor("main")};
    font-family: ${font("primary")};
    /* stylelint-disable unit-allowed-list */
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
  }
  a {
    appearance: none;
    color: #000;
    text-decoration: none;
  }
  #root, body > div:first-of-type {
    z-index: ${zIndex("content")};
    position: relative;
  }
  * {
    ::-webkit-scrollbar {
      width: ${width("scrollbar")};
    }
    ::-webkit-scrollbar-track {
      border-radius: ${width("scrollbar")};
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: ${width("scrollbar")};
      background-color: transparent;
    }
    ::-webkit-scrollbar:horizontal {
      height: ${width("scrollbar")};
    }
    ::-webkit-scrollbar-track:horizontal {
      border-radius: ${width("scrollbar")};
      background: transparent;
    }
    ::-webkit-scrollbar-thumb:horizontal {
      border-radius: ${width("scrollbar")};
      background-color: transparent;
    }
    /* stylelint-disable no-descending-specificity */
    :hover, :focus {
      ::-webkit-scrollbar-thumb {
        background-color: ${backgroundColor("scroll")};
      }
      ::-webkit-scrollbar-thumb:horizontal {
        background-color: ${backgroundColor("scroll")};
      }
    }
    /* stylelint-enable no-descending-specificity */
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
  }
`
export default GlobalStyle

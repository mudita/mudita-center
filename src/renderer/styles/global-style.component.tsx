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
    /* stylelint-disable unit-whitelist */
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
`
export default GlobalStyle

import {
  backgroundColor,
  font,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { createGlobalStyle } from "styled-components"
import { Theme } from "./theming/theme"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body  {
    background-color: ${backgroundColor("app")};
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
      width: 0.2rem;
    }
    ::-webkit-scrollbar-track {
      border-radius: 0.2rem;
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 0.2rem;
      background-color: transparent;
    }
    :hover, :focus {
      ::-webkit-scrollbar-thumb {
        background-color: ${backgroundColor("grey4")};
      }
    }
  }
`
export default GlobalStyle

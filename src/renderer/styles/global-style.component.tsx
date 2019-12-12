import { font } from "Renderer/styles/theming/theme-getters"
import { createGlobalStyle } from "styled-components"
import { Theme } from "./theming/theme"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body  {
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
  #root {
    z-index: 1;
    position: relative;
  }
`
export default GlobalStyle

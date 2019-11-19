import { createGlobalStyle } from "styled-components"
import { Theme } from "./theming/theme"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body  {
    font-family: 'San Francisco', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
  }
`

export default GlobalStyle

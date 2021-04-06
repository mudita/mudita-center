import React from "react"
import { ThemeProvider } from "styled-components"
import { color } from "./color"
import { spacing } from "./spacing"
import { fontSize } from "./font-size"
import { fontWeight } from "./font-weight"
import { AppFunctionComponent } from "@mudita/app-function-component"

export const theme = {
  color,
  spacing,
  fontSize,
  fontWeight,
} as const

export const MuditaThemeProvider: AppFunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

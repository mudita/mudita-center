import React from "react"
import { ThemeProvider } from "styled-components"
import { color } from "Theme/color"
import { spacing } from "Theme/spacing"
import { fontSize } from "Theme/font-size"
import { fontWeight } from "Theme/font-weight"
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

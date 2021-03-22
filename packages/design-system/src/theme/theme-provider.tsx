import React from "react"
import { ThemeProvider } from "styled-components"
import { color } from "Theme/parts/color"
import { spacing } from "Theme/parts/spacing"
import { fontSize } from "Theme/parts/font-size"
import { AppFunctionComponent } from "@mudita/app-function-component"

export const theme = {
  color,
  spacing,
  fontSize,
} as const

export const MuditaThemeProvider: AppFunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

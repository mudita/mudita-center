import React from "react"
import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import { MuditaThemeProvider } from "Theme/theme-provider"
import { MuditaGlobalStyle } from "Theme/global-style"

export function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult
export function renderWithTheme<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult
export function renderWithTheme<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q>
): RenderResult {
  return render(
    <MuditaThemeProvider>
      <MuditaGlobalStyle />
      {ui}
    </MuditaThemeProvider>,
    options
  )
}

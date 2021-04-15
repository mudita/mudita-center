import React from "react"
import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import { MuditaThemeProvider } from ".."
import "jest-styled-components"

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
  return render(<MuditaThemeProvider>{ui}</MuditaThemeProvider>, options)
}

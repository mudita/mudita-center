import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { SettingsTestIds } from "Renderer/modules/settings/settings.enum"

const renderer = (config = { appAutostart: false, appTethering: false }) =>
  renderWithThemeAndIntl(<SettingsUI {...config} />)

test("matches snapshot", () => {
  const { container } = renderer()
  expect(container).toMatchSnapshot()
})

test("renders wrapper properly", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(SettingsTestIds.Wrapper)).toBeInTheDocument()
})

test("renders description properly", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(SettingsTestIds.Description)).toBeInTheDocument()
})

test("renders at least one table row", () => {
  const { queryAllByTestId } = renderer()
  expect(
    queryAllByTestId(SettingsTestIds.TableRow).length
  ).toBeGreaterThanOrEqual(1)
})

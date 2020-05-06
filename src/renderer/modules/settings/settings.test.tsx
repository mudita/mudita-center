import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <SettingsUI autostart={false} tethering={false} />
  )
  expect(container).toMatchSnapshot()
})

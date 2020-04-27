import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Settings from "Renderer/modules/settings/settings.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Settings />)
  expect(container).toMatchSnapshot()
})

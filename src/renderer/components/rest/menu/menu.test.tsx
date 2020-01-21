import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Router } from "react-router"
import Menu from "Renderer/components/rest/menu/menu.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <Menu />
    </Router>
  )
  expect(container).toMatchSnapshot()
})

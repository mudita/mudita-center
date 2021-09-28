/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { Router } from "react-router"
import Menu from "Renderer/components/rest/menu/menu.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { flags, Feature } from "App/feature-flags"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"

if (flags.get(Feature.DisabledOnProduction)) {
  test("matches snapshot", () => {
    const { container } = renderWithThemeAndIntl(
      <Router history={history}>
        <Menu />
      </Router>
    )
    expect(container).toMatchSnapshot()
  })
}

test("Menu should have overview item", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <Router history={history}>
      <Menu />
    </Router>
  )
  expect(getByTestId(MenuGroupTestIds.Help)).toHaveTextContent("[value] module.help")
})
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Tabs from "App/__deprecated__/renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { flags } from "App/feature-flags"

jest.mock("App/feature-flags")

test("on current location tabs should not be rendered ", () => {
  const currentLocation = "/overview"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tabs currentLocation={currentLocation} />
    </MemoryRouter>
  )

  const tabLinks = container.querySelectorAll("a")
  expect(tabLinks).toHaveLength(0)
})

test("on current location tabs should be rendered", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(false)
  const currentLocation = "/messages"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tabs currentLocation={currentLocation} />
    </MemoryRouter>
  )

  const tabLinks = container.querySelectorAll("a")
  expect(tabLinks).toHaveLength(2)
})

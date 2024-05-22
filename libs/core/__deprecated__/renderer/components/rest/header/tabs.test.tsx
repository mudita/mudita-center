/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { MemoryRouter } from "react-router-dom"
import Tabs from "Core/__deprecated__/renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"

jest.mock("Core/feature-flags/helpers/feature-flag.helpers", () => ({
  flags: {
    get: () => true,
  },
}))

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
  const currentLocation = "/messages"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tabs currentLocation={currentLocation} />
    </MemoryRouter>
  )

  const tabLinks = container.querySelectorAll("a")
  expect(tabLinks).toHaveLength(2)
})

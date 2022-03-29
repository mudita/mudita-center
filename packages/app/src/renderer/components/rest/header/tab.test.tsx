/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Tab from "Renderer/components/rest/header/tab.component"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { IconType } from "Renderer/components/core/icon/icon-type"

const message = mockDefineMessages("module.phone")
const currentLocation = "/phone"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tab icon={IconType.Check} label={message} url={currentLocation} />
    </MemoryRouter>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("has correct text content", () => {
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tab icon={IconType.Check} label={message} />
    </MemoryRouter>
  )
  const tabNode = container.firstChild
  expect(tabNode).toHaveTextContent("module.phone")
})

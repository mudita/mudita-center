/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Icon type={IconType.Battery} />)
  expect(container.firstChild).toMatchSnapshot()
})

test("matches snapshot with badge", () => {
  const { container } = renderWithThemeAndIntl(
    <Icon type={IconType.Battery} badge />
  )

  expect(container.firstChild).toMatchSnapshot()
})

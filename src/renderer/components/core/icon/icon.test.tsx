import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Icon, { Type } from "Renderer/components/core/icon/icon.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Icon type={Type.Battery} />)
  expect(container.firstChild).toMatchSnapshot()
})

test("matches snapshot with badge", () => {
  const badgeId = "icon-wrapper"
  const { getByTestId } = renderWithThemeAndIntl(
    <Icon type={Type.Battery} badge />
  )

  expect(getByTestId(badgeId)).toMatchSnapshot()
})

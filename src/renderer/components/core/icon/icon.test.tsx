import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Icon type={Type.Battery} />)
  expect(container.firstChild).toMatchSnapshot()
})

test("matches snapshot with badge", () => {
  const { container } = renderWithThemeAndIntl(
    <Icon type={Type.Battery} badge />
  )

  expect(container.firstChild).toMatchSnapshot()
})

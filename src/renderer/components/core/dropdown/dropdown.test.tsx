import "@testing-library/jest-dom/extend-expect"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Dropdown, {
  Size,
} from "Renderer/components/core/dropdown/dropdown.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("renders dropdown", () => {
  const { container } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent />} size={Size.S} />
  )
  expect(container.firstChild).toBeInTheDocument()
})

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import DropdownItem from "Renderer/components/core/dropdown/dropdown-item.component"
import Upload from "Renderer/svg/upload.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const text = "Export"
  const { container } = renderWithThemeAndIntl(
    <DropdownItem Icon={Upload} text={text} />
  )
  const dropdownItem = container.firstChild
  expect(dropdownItem).toMatchSnapshot()
  expect(dropdownItem).toHaveTextContent(text)
})

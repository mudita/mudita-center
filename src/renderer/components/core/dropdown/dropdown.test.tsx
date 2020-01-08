import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import DropdownItem from "Renderer/components/core/dropdown/dropdown-item.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Upload from "Renderer/svg/upload.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent />} />
  )
  expect(container).toMatchSnapshot()
})

test("renders toggler passed to component", () => {
  const buttonText = "Example"
  const { getByText } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />} />
  )
  expect(getByText(buttonText)).toBeInTheDocument()
})

test("renders dropdown", () => {
  const buttonText = "Example"
  const { getByTestId, getByText, container } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />} />
  )

  fireEvent.click(getByText(buttonText))

  expect(getByTestId("dropdown")).toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

test("renders children", () => {
  const buttonText = "Example"
  const childText = "childText"
  const { getByText } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />}>
      <DropdownItem Icon={Upload} text={childText} />
    </Dropdown>
  )

  fireEvent.click(getByText(buttonText))

  expect(getByText(childText)).toBeInTheDocument()
  expect(getByText(childText)).toHaveTextContent(childText)
})
